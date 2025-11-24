"use client";

import { Montserrat } from "next/font/google";
import "./footer.css";

const montserrat = Montserrat({
  weight: ['400', '700'], // 对于非可变字体，必须指定字重[citation:6]
  subsets: ['latin'],
});

export default function Footer() {
  return (
    <footer className="footer montserrat">
      <div className="footer-content">
        <div className="footer-logo">BrandName</div>
        <p className="footer-description">我们致力于提供最优质的产品和服务，让每一位客户都能感受到我们的专业与热情。</p>

        <div className="footer-links">
          <div className="link-column">
            <h3>产品</h3>
            <ul>
              <li><a href="#">功能特色</a></li>
              <li><a href="#">价格方案</a></li>
              <li><a href="#">使用案例</a></li>
              <li><a href="#">更新日志</a></li>
            </ul>
          </div>

          <div className="link-column">
            <h3>资源</h3>
            <ul>
              <li><a href="#">帮助中心</a></li>
              <li><a href="#">博客</a></li>
              <li><a href="#">教程</a></li>
              <li><a href="#">API文档</a></li>
            </ul>
          </div>

          <div className="link-column">
            <h3>公司</h3>
            <ul>
              <li><a href="#">关于我们</a></li>
              <li><a href="#">职业机会</a></li>
              <li><a href="#">联系我们</a></li>
              <li><a href="#">合作伙伴</a></li>
            </ul>
          </div>
        </div>

        <div className="social-icons">
          <div className="social-icon">f</div>
          <div className="social-icon">t</div>
          <div className="social-icon">in</div>
          <div className="social-icon">ig</div>
        </div>

        <div className="copyright">
          &copy; 2023 BrandName. 保留所有权利。
        </div>
      </div>
    </footer>
  )
}