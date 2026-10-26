# Zhipeng Liao · Academic Homepage

基于 React、TypeScript、Vite 与 Tailwind CSS 的中英双语学术个人主页，支持响应式布局、论文分类筛选和 GitHub Pages 自动部署。

## 本地开发

```bash
npm install
npm run dev
```

构建生产版本：

```bash
npm run build
```

静态文件输出到 `dist/`。Vite 使用相对资源路径，因此同时支持 `username.github.io` 个人站点和 `username.github.io/repository/` 项目站点。

## 部署到 GitHub Pages

1. 在 GitHub 新建仓库。若希望地址为 `https://<用户名>.github.io/`，仓库名设为 `<用户名>.github.io`。
2. 将本项目推送到仓库的 `main` 分支。
3. 打开仓库 **Settings → Pages**，在 **Build and deployment → Source** 中选择 **GitHub Actions**。
4. 推送后，`.github/workflows/deploy.yml` 会自动构建并发布；也可在 **Actions** 页面手动运行工作流。

本项目只生成和配置文件，不会自动创建 GitHub 仓库或推送代码。

## 内容维护

- 页面文字、论文、研究与教育经历：`src/App.tsx`
- 视觉样式：`src/index.css`
- 照片：`public/images/profile.jpg`
- 简历：`public/files/resume.pdf`
- 页面标题与 SEO：`index.html`

Google Scholar、GitHub、ORCID 与 LinkedIn 链接集中维护在 `src/App.tsx` 的 `socialLinks` 数组中。
