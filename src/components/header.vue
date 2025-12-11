<template>
  <div class="header">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      text-color="#fff"
      background-color="#405c70"
      active-text-color="#ffd04b"
      :class="menuClass"
    >
      <div class="logo">mSNVdb</div>
      <el-menu-item index="1" @click="navigateTo('/home')">Home</el-menu-item>
      <el-menu-item index="2" @click="navigateTo('/data')">Data</el-menu-item>
      <el-sub-menu index="3">
        <template #title>Tools</template>
        <el-menu-item index="3-1" @click="navigateTo('/individual_SNV')">Individual_SNV</el-menu-item>
        <el-menu-item index="3-2">item two</el-menu-item>
        <el-menu-item index="3-3">item three</el-menu-item>
      </el-sub-menu>

      <!------ 搜索框 ------->
      <div class="github-search" @click="toggleDropdown" ref="searchBox">
        <el-icon class="search-icon"><Search /></el-icon>
        <div class="search-show" @focus="openDropdown">Search or jump to...</div>
        <div class="shortcut">/</div>
      </div>
    </el-menu>

    <!-- 遮罩层 -->
    <div v-if="showDropdown" class="search-mask"></div>

    <!-- 弹出层 -->
    <transition name="fade">
      <div v-if="showDropdown" class="search-dropdown" ref="dropdown">
        <div class="dropdown-content">
          <div class="search-frame">
            <el-icon class="search-icon"><Search /></el-icon>
            <input
              v-model="searchQuery"
              class="search-input"
              placeholder="Search or jump to..."
              @keyup.enter="saveSearchHistory"
            />
            <el-icon class="clear-icon"
              :disabled="!searchQuery"
              @click.stop="clearSearch"
            >
              <CircleClose />
            </el-icon>
          </div>
          <!-- 历史记录区 -->
          <div v-if="searchHistory.length > 0" class="history-list">
            <div
              v-for="(item, index) in searchHistory"
              :key="index"
              class="search-result"
            >
              <div class="left-part" @click="useHistoryItem(item.text)">
                <el-icon class="history-icon"><Clock /></el-icon>
                <span class="history-text">{{ item.text }}</span>
              </div>

              <el-icon
                class="delete-icon"
                title="Delete this record"
                @click.stop="deleteHistoryItem(index)"
              >
                <CircleClose />
              </el-icon>
            </div>
          </div>
          <div v-else class="no-history">No recent searches</div>
        </div>
      </div>
    </transition>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import axios from "../api/index";
import { Search, CircleClose, RefreshRight } from "@element-plus/icons-vue";

const activeIndex2 = ref("1");
const router = useRouter();
const route = useRoute();

watch(() => route.path,
  (newPath) => {
    if (newPath === "/home") {
      activeIndex2.value = "1";
    } else if (newPath === "/data") {
      activeIndex2.value = "2";
    } else if (newPath === "/individual_SNV") {
      activeIndex2.value = "3-1";
    }
  },
  { immediate: true }
);

const navigateTo = (path) => {router.push(path);};
const handleSelect = (index) => {console.log("Selected index:", index);};


//-------搜索框---------------------------------------------------------
const searchQuery = ref("");
const showDropdown = ref(false);

const openDropdown = () => (showDropdown.value = true);
const toggleDropdown = () => (showDropdown.value = !showDropdown.value);

// 点击外部关闭弹层
const searchBox = ref(null);
const dropdown = ref(null);

const handleClickOutside = (e) => {
  if (
    searchBox.value &&
    !searchBox.value.contains(e.target) &&
    dropdown.value &&
    !dropdown.value.contains(e.target)
  ) {
    showDropdown.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside));

// -------- 弹出层 ------------------------------------------------
const MAX_HISTORY = 10;
const EXPIRE_DAYS = 30;
const STORAGE_KEY = "search_history";
const searchHistory = ref([]);

// 加载本地搜索历史
const loadSearchHistory = () => {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const now = Date.now();
  searchHistory.value = saved.filter((item) => now - item.time < EXPIRE_DAYS * 24 * 60 * 60 * 1000);
};

// 保存到 localStorage
const saveSearchHistory = () => {
  const now = Date.now();

  // 如果输入为空或重复，不存
  if (!searchQuery.value.trim()) return;

  // 删除重复项
  const filtered = searchHistory.value.filter((h) => h.text !== searchQuery.value.trim());

  // 新的历史放最前面
  filtered.unshift({ text: searchQuery.value.trim(), time: now });

  // 最多保存 10 条
  searchHistory.value = filtered.slice(0, MAX_HISTORY);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory.value));
};

// 清空搜索框时不清历史
const clearSearch = () => {searchQuery.value = "";};

// 点击搜索历史某一项 → 回填
const useHistoryItem = (text) => {
  searchQuery.value = text;
  showDropdown.value = false;
};

// 删除单条历史
const deleteHistoryItem = (index) => {
  searchHistory.value.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory.value));
};

// 初始化加载
onMounted(loadSearchHistory);



// --------- 响应式逻辑 --------------------------------------------
const screenWidth = ref(window.innerWidth);

// 监听屏幕变化
const updateWidth = () => {screenWidth.value = window.innerWidth;};

onMounted(() => {
  updateWidth();
  window.addEventListener("resize", updateWidth);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWidth);
});

// 动态计算当前设备类型
const deviceType = computed(() => {
  if (screenWidth.value < 768) return "mobile"; // 手机
  if (screenWidth.value < 1200) return "tablet"; // 平板
  return "desktop"; // 电脑
});

// 根据设备类型控制样式
const menuClass = computed(() => {
  return {
    mobile: deviceType.value === "mobile",
    tablet: deviceType.value === "tablet",
    desktop: deviceType.value === "desktop",
  };
});
</script>

<style lang="scss" scoped>
// ----顶栏基础 -----------------------------------------------
.header {
  width: 100%;
  margin: 0;
  padding: 0;
  box-shadow: 0 2px 6px rgba(157, 154, 154, 0.25);
  background-color: transparent; /* 保证 el-menu 背景可见 */
}

/* 使 el-menu 成为可定位的容器，这样下拉可以用相对定位到搜索框 */
.el-menu-demo {
  border: none;
  display: flex;
  align-items: center;
  padding: 0 12px;
  position: relative; /* 重要：为内部绝对定位元素提供参照 */
}

.logo {
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  margin-right: 18px;
}

/* ========== 显示的搜索框图 ========== */
/* 强制使用 box-sizing，避免内边距/边框影响宽度计算 */
.github-search,
.github-search * {
  box-sizing: border-box;
}

/* 确保搜索容器在 el-menu 中以行内块显示并可被布局控制 */
.github-search {
  display: flex;
  align-items: center;
  position: relative;               /* 重要：下拉将以此为参照绝对定位 */
  background-color: #405c70;        /* 内部颜色和导航栏一致 */
  border: 1px solid rgba(255,255,255,0.18); /* 比较淡的白边，跟 GitHub 类似 */
  border-radius: 6px;
  padding: 4px 8px;
  margin-left: 18px;                /* 与左侧菜单项保持间距 */
  height: 34px;
  cursor: text;
  transition: all 0.12s ease;
  width: 260px;                     /* 固定合适宽度，避免被菜单 flex 压缩 */
  min-width: 180px;
  max-width: 40vw;
}

/* 悬停、聚焦时边框上亮 */
.github-search:hover,
.github-search:focus-within {
  border-color: rgba(255,255,255,0.9);
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}

/* 图标 */
.github-search .search-icon {
  color: rgba(255,255,255,0.95);
  margin-right: 8px;
  font-size: 16px;
  flex: 0 0 auto;
}

/* 输入框：占满剩余空间 */
.github-search .search-show {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  flex: 1 1 auto;
  font-size: 14px;
  padding: 0;
  line-height: 1;
  min-width: 40px; /* 防止极端情况下收缩为 0 */
}

/* 占位符颜色 */
.github-search .search-show {
  color: rgba(255,255,255,0.6);
}

/* 去掉默认 search-show 聚焦时的外部轮廓（保留自定义阴影） */
.github-search .search-show:focus {
  outline: none;
}

/* 快捷键小标签 */
.github-search .shortcut {
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  padding: 4px 6px;
  color: #fff;
  margin-left: 8px;
  flex: 0 0 auto;
}

/* 渐变入场淡出动画 */
.fade-enter-active,
.fade-leave-active { transition: opacity 0.16s ease, transform 0.16s ease; }
.fade-enter-from { opacity: 0; transform: translateY(6px); }
.fade-enter-to { opacity: 1; transform: translateY(0); }
.fade-leave-from { opacity: 1; transform: translateY(0); }
.fade-leave-to { opacity: 0; transform: translateY(6px); }




/* === 遮罩层：覆盖整个页面，半透明黑色 === */
.search-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0000005c; /* 半透明黑色，可调整透明度 */
  z-index: 2000; /* 确保在页面内容上方，但低于弹出层 */
}




/* === 弹出层（现在相对于 .github-search 定位） === */
.search-dropdown {
  position: absolute;
  top: 1.5%;
  left: 7%;
  width: 86%;
  max-width: 85vw; /* 确保不超过视口宽度的85% */
  max-height: 500px; /* 可选：限制最大高度，避免过高 */
  overflow-y: auto; /* 内容过多时显示滚动条 */
  background-color: #fff;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  z-index: 2500;
  overflow: hidden;
}

/* 下拉内部内容 */
.dropdown-content {
  display: flex;
  flex-direction: column;
  padding: 8px 6px;
}

/* 弹出层内部搜索框样式 */
.dropdown-content .search-frame {
  display: flex;
  align-items: center;
  border: 2px solid #d0d7de;      /* 边框 */
  border-radius: 6px;
  padding: 6px 10px;
  background: #fff;               /* 白色背景 */
  margin-bottom: 10px;            /* 与下方结果分开一点 */
  transition: border-color 0.2s ease;
}
.dropdown-content .search-frame:focus-within {
  border-color: #2588eb; 
}
.dropdown-content .search-frame:hover {
  border-color: #2588eb;
}

/* 放大镜图标 */
.dropdown-content .search-frame .search-icon {
  color: #57606a;
  margin-right: 8px;
  font-size: 16px;
}

/* 输入框样式 */
.dropdown-content .search-frame .search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #24292f;
  background: transparent;
}

/* 右边的 X */
.dropdown-content .search-frame .clear-icon {
  color: #8c959f; 
  font-size: 16px;
  cursor: pointer;
  margin-left: 8px;
  transition: color 0.2s ease, transform 0.15s ease;
}
.dropdown-content .search-frame .clear-icon[disabled] {
  color: #d0d7de;
  pointer-events: none;
}
.dropdown-content .search-frame .clear-icon:hover {
  color: #24292f;
  transform: scale(1.1);
}

/* --- 弹出层-历史记录 --- */
/* 每一条历史记录 */
.search-result {
  display: flex;        // 开启Flex布局
  align-items: center;  // 垂直居中
  justify-content: space-between; // 文字左、叉叉右
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #a0c7ee34;
  }
}

/* 历史记录的图标 */
.history-icon {
  color: #666;
  margin-right: 8px; // 图标与文字间距
  cursor: pointer;
}

/* 历史记录的文字 */
.history-text {
  flex: 1; // 文字占满剩余空间
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 删除叉叉图标 */
.delete-icon {
  color: #999;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #f56c6c;
  }
}

/* 无历史记录时 */
.no-history {
  color: #8c959f;
  font-size: 14px;
  padding: 10px 12px;
  text-align: center;
}





/* ---------- 响应式：手机或平板时调整宽度 & 隐藏搜索（如需要） ---------- */
@media (max-width: 768px) {
  .github-search { display: none; } /* 若需要在移动端隐藏搜索框，可保留或删除此行 */
  /* 若要在移动端保留搜索框，请改为更窄： width: 160px; */
}

/* 平板端：让菜单更紧凑，搜索框缩小一点 */
@media (max-width: 1200px) and (min-width: 769px) {
  .el-menu-demo {
    padding: 0 10px;
  }

  .github-search {
    width: 200px;
  }
}

/* 手机端：导航栏改为上下排列（纵向展开） */
@media (max-width: 768px) {
  .el-menu-demo {
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 12px;
  }

  .logo {
    margin-bottom: 8px;
  }

  .el-menu-item,
  .el-sub-menu {
    width: 100%;
    justify-content: flex-start;
  }

  /* 搜索框显示在最下方 */
  .github-search {
    display: flex;
    width: 100%;
    margin-top: 8px;
  }
}
</style>

