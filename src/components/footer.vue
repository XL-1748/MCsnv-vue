<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Browse Section -->
      <div class="footer-section">
        <h2 class="footer-header">Browse</h2>
        <div class="footer-menu">
          <div class="link-item">
            <router-link to="/IndividualSNV/IndividualSNV">Individual SNVs</router-link>
          </div>
          <div class="link-item">
            <router-link to="/data/data">Data</router-link>
          </div>
        </div>
      </div>

      <!-- Resources Section -->
      <div class="footer-section">
        <h2 class="footer-header">Resources</h2>
        <div class="footer-menu">
          <div class="link-item">
            <a href="https://www.ncbi.nlm.nih.gov/snp/" target="_blank">NCBI</a>
          </div>
          <div class="link-item">
            <a href="http://www.ensembl.org/index.html" target="_blank">Ensembl</a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p class="footer-text">
          Macaca mulatta single nucleotide variation database created by roommate, School of Life Sciences, Capital Normal University.
        </p>
        <p class="footer-text">
          Copyright &copy; Capital Normal University. All Rights Reserved.
        </p>
      </div>
    </div>

    <!-- Footer Divider -->
    <el-divider></el-divider>

    <!-- Logos & Links Section -->
    <div class="footer-logos">
      <el-row>
        <el-col :span="12">
          <el-image class="footer-logo" :src="cduLogo" />
        </el-col>
        <el-col :span="12" class="right-aligned">
          <div class="footer-links">
            <el-link href="https://smkxxy.cnu.edu.cn/" target="_blank">About Us</el-link>
            <el-link href="https://smkxxy.cnu.edu.cn/" target="_blank">Contact Us</el-link>
          </div>
          <div class="footer-powered">
            Powered by <el-link href="https://www.djangoproject.com/" target="_blank">Django</el-link> and rendered by
            <el-link href="https://cn.vuejs.org/" target="_blank">Vue</el-link>, designed with
            <el-link href="https://element-plus.org/zh-CN/" target="_blank">Element Plus</el-link>.
          </div>
        </el-col>
      </el-row>
    </div>
  </footer>
</template>

<script setup>
// 图片资源
const cduLogo = '../public/img/1151.png';

// 默认菜单的选中项
const activeIndex = '1';
</script>

<style scoped>
.footer {
  background-color: #1b1b1a;
  color: white;
  padding: 40px 0;
  height: 100%;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  margin: 0 5%;
  height: 100%;
}

.footer-section {
  flex: 1;
  margin-right: 10%;
}

.footer-header {
  font-size: 18px;
  font-weight: 600;
}

.footer-menu {
  margin-top: auto;
}

.link-item {
  margin: 10px 0;
}

.link-item a,
.link-item router-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
}

.link-item a:hover,
.link-item router-link:hover {
  color: white;
}

.footer-bottom {
  flex: 2;
  font-size: 14px;
  color: white;
  padding-top: 30px;
}

.footer-text {
  margin: 10px 0;
}

.footer-logos {
  margin-top: 20px;
  text-align: center;
  text-decoration: none !important;
}

.footer-logo {
    width: 100%;   /* 使图片宽度自适应父容器 */
    max-width: 150px;  /* 限制最大宽度 */
    height: 150px;    /* 自动调整高度 */
    opacity: 1;  /* 设置透明度 */
  }

.footer-links {
  margin-top: 50px;
  text-decoration: none ;
  display: flex;
  gap: 20px;
  justify-content: center; /* 水平方向居中对齐 */
  align-items: center;     /* 垂直方向居中对齐 */
}

::v-deep .el-link {
  text-decoration: none !important;
  color: rgba(255, 255, 255, 0.7) !important;
}

::v-deep .el-link:active {
  color: white !important; 
  text-decoration: none !important; 
}

::v-deep .el-link:hover {
  text-decoration: none !important;
  color: white !important;
}

::v-deep .el-link::before,
::v-deep .el-link::after {
  display: none !important;
}

.el-divider {
  margin: 20px 0;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
  }

  .footer-section {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .footer-bottom {
    text-align: center;
  }
}
</style>
