addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
  
async function handleRequest(request) {
    return new Response(html, {
      headers: { 
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=3600'
      }
    })
}
  
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>简约导航</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, 
                         "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", 
                         "WenQuanYi Micro Hei", sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #e0f7fa, #c8e6c9, #dcedc8);
            min-height: 100vh;
            padding: 6px 2px;
            color: #2c3e50;
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite;
            line-height: 1.6;
        }
        
        /* 扁平模式基础样式 */
        body.flat-theme {
            background: #f5f7fa;
            animation: none;
        }
        
        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 12px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .logo {
            font-size: 1.8rem;
            margin-bottom: 8px;
            color: #2c3e50;
            font-weight: 500;
        }
        
        body.flat-theme .logo {
            color: #4a5568;
        }
        
        .search-container {
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50px;
            padding: 4px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            display: flex;
            transition: all 0.3s ease;
            border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        body.flat-theme .search-container {
            background: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            border: 1px solid #e2e8f0;
        }
        
        .search-container:focus-within {
            box-shadow: 0 4px 15px rgba(52, 152, 219, 0.2);
            background: rgba(255, 255, 255, 0.95);
        }
        
        body.flat-theme .search-container:focus-within {
            box-shadow: 0 4px 12px rgba(66, 153, 225, 0.2);
            background: white;
        }
        
        .search-engine-selector {
            display: flex;
            align-items: center;
            padding: 0 12px;
            border-right: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        body.flat-theme .search-engine-selector {
            border-right: 1px solid #e2e8f0;
        }
        
        .engine-icon {
            font-size: 16px;
            color: #3498db;
            margin-right: 6px;
        }
        
        body.flat-theme .engine-icon {
            color: #4299e1;
        }
        
        select {
            border: none;
            background: transparent;
            font-size: 14px;
            color: #2c3e50;
            outline: none;
            cursor: pointer;
            width: 130px;
        }
        
        body.flat-theme select {
            color: #4a5568;
        }
        
        .search-input {
            flex: 1;
            padding: 10px 12px;
            border: none;
            font-size: 14px;
            outline: none;
            background: transparent;
            color: #2c3e50;
        }
        
        body.flat-theme .search-input {
            color: #4a5568;
        }
        
        .search-input::placeholder {
            color: rgba(44, 62, 80, 0.5);
        }
        
        body.flat-theme .search-input::placeholder {
            color: #a0aec0;
        }
        
        .search-btn {
            background: #3498db;
            color: white;
            border: none;
            border-radius: 50px;
            padding: 10px 20px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        body.flat-theme .search-btn {
            background: #4299e1;
        }
        
        .search-btn:hover {
            background: #2980b9;
        }
        
        body.flat-theme .search-btn:hover {
            background: #3182ce;
        }
        
        .categories-container {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin: 20px 0;
        }
        
        .category-row {
            display: flex;
            flex-direction: column;
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(5px);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.5);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        body.flat-theme .category-row {
            background: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            border: 1px solid #eaeaea;
        }
        
        .category-row:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
        }
        
        body.flat-theme .category-row:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .category-header {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            background: rgba(52, 152, 219, 0.1);
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        body.flat-theme .category-header {
            background: #ebf8ff;
            border-bottom: 1px solid #e2e8f0;
        }
        
        /* 分类图标尺寸减小 */
        .category-icon {
            font-size: 13px; /* 减小字体大小 */
            width: 24px; /* 减小尺寸 */
            height: 24px; /* 减小尺寸 */
            background: rgba(52, 152, 219, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 8px;
            color: #3498db;
        }
        
        body.flat-theme .category-icon {
            background: #bee3f8;
            color: #3182ce;
        }
        
        /* 分类标题字体减小 */
        .category-title {
            font-size: 0.98rem; /* 减小字体大小 */
            color: #2c3e50;
            font-weight: 500;
        }
        
        body.flat-theme .category-title {
            color: #2d3748;
        }
        
        .links-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
            gap: 10px;
            padding: 10px;
        }
        
        .link-item {
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: #2c3e50;
            padding: 8px 6px;
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.6);
            transition: all 0.3s ease;
            height: 50px;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
        }
        
        body.flat-theme .link-item {
            background: #f7fafc;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
            border: 1px solid #edf2f7;
        }
        
        .link-item:hover {
            background: rgba(255, 255, 255, 0.9);
            transform: translateY(-3px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        body.flat-theme .link-item:hover {
            background: #edf2f7;
            transform: translateY(-2px);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
        }
        
        footer {
            text-align: center;
            padding: 12px;
            color: rgba(44, 62, 80, 0.7);
            font-size: 12px;
            border-top: 1px solid rgba(0, 0, 0, 0.05);
            margin-top: 15px;
        }
        
        body.flat-theme footer {
            color: #718096;
            border-top: 1px solid #e2e8f0;
        }
        
        .theme-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: #3498db;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        body.flat-theme .theme-toggle {
            background: #4299e1;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
        }
        
        body.flat-theme .theme-toggle:hover {
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }
        
        .theme-toggle i {
            font-size: 20px;
        }
        
        @media (min-width: 1025px) {
            .link-item {
                padding: 10px 8px;
                height: 55px;
            }
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 8px;
            }
            
            .logo {
                font-size: 1.4rem;
            }
            
            .search-container {
                flex-direction: column;
                border-radius: 15px;
                padding: 8px;
            }
            
            .search-engine-selector {
                border-right: none;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                padding-bottom: 8px;
                margin-bottom: 8px;
                justify-content: center;
            }
            
            body.flat-theme .search-engine-selector {
                border-bottom: 1px solid #e2e8f0;
            }
            
            select {
                width: 120px;
            }
            
            .search-btn {
                margin-top: 8px;
                width: 100%;
            }
            
            .category-header {
                padding: 6px 10px;
                justify-content: center;
            }
            
            .category-icon {
                display: none;
            }
            
            /* 小屏幕分类标题字体减小 */
            .category-title {
                font-size: 0.95rem; /* 减小字体大小 */
                text-align: center;
                width: 100%;
            }
            
            .links-container {
                grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                gap: 8px;
                padding: 8px;
            }
            
            .link-item {
                padding: 10px 4px;
                height: 45px;
                font-size: 13px;
            }
        }
        
        @media (max-width: 480px) {
            .links-container {
                grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
                gap: 6px;
            }
            
            .link-item {
                padding: 8px 4px;
                height: 42px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">简约导航</div>
            
            <div class="search-container">
                <div class="search-engine-selector">
                    <i class="fas fa-search engine-icon"></i>
                    <select id="engine-select">
                        <option value="duckduckgo">DuckDuckGo</option>
                        <option value="baidu">百度</option>
                        <option value="google">谷歌</option>
                        <option value="bing">Bing</option>
                    </select>
                </div>
                <input type="text" class="search-input" id="search-input" placeholder="输入关键词搜索...">
                <button class="search-btn" id="search-btn">搜索</button>
            </div>
        </div>
        
        <div class="categories-container">
            <!-- 常用网站 -->
            <div class="category-row">
                <div class="category-header">
                    <div class="category-icon">
                        <i class="fas fa-star"></i>
                    </div>
                    <h2 class="category-title">常用网站</h2>
                </div>
                <div class="links-container">
                    <a href="https://github.com" target="_blank" class="link-item" rel="nofollow">GitHub</a>
                    <a href="https://gitee.com" target="_blank" class="link-item" rel="nofollow">Gitee</a>
                    <a href="https://stackoverflow.com" target="_blank" class="link-item" rel="nofollow">Stack Overflow</a>
                    <a href="https://zhihu.com" target="_blank" class="link-item" rel="nofollow">知乎</a>
                    <a href="https://bilibili.com" target="_blank" class="link-item" rel="nofollow">哔哩哔哩</a>
                    <a href="https://youtube.com" target="_blank" class="link-item" rel="nofollow">YouTube</a>
                </div>
            </div>
            
            <!-- 交易所 -->
            <div class="category-row">
                <div class="category-header">
                    <div class="category-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h2 class="category-title">交易所</h2>
                </div>
                <div class="links-container">
                    <a href="https://binance.com" target="_blank" class="link-item" rel="nofollow">币安</a>
                    <a href="https://coinbase.com" target="_blank" class="link-item" rel="nofollow">Coinbase</a>
                    <a href="https://okx.com" target="_blank" class="link-item" rel="nofollow">OKX</a>
                    <a href="https://huobi.com" target="_blank" class="link-item" rel="nofollow">火币</a>
                    <a href="https://kraken.com" target="_blank" class="link-item" rel="nofollow">Kraken</a>
                    <a href="https://bybit.com" target="_blank" class="link-item" rel="nofollow">Bybit</a>
                </div>
            </div>
            
            <!-- AI -->
            <div class="category-row">
                <div class="category-header">
                    <div class="category-icon">
                        <i class="fas fa-robot"></i>
                    </div>
                    <h2 class="category-title">AI工具</h2>
                </div>
                <div class="links-container">
                    <a href="https://openai.com" target="_blank" class="link-item" rel="nofollow">OpenAI</a>
                    <a href="https://deepmind.com" target="_blank" class="link-item" rel="nofollow">DeepMind</a>
                    <a href="https://huggingface.co" target="_blank" class="link-item" rel="nofollow">Hugging Face</a>
                    <a href="https://www.midjourney.com" target="_blank" class="link-item" rel="nofollow">Midjourney</a>
                    <a href="https://stability.ai" target="_blank" class="link-item" rel="nofollow">Stable Diffusion</a>
                    <a href="https://www.anthropic.com" target="_blank" class="link-item" rel="nofollow">Claude</a>
                </div>
            </div>
            
            <!-- 新闻资讯 -->
            <div class="category-row">
                <div class="category-header">
                    <div class="category-icon">
                        <i class="fas fa-newspaper"></i>
                    </div>
                    <h2 class="category-title">新闻资讯</h2>
                </div>
                <div class="links-container">
                    <a href="https://reuters.com" target="_blank" class="link-item" rel="nofollow">路透社</a>
                    <a href="https://bbc.com" target="_blank" class="link-item" rel="nofollow">BBC新闻</a>
                    <a href="https://cnbc.com" target="_blank" class="link-item" rel="nofollow">CNBC</a>
                    <a href="https://www.theguardian.com" target="_blank" class="link-item" rel="nofollow">卫报</a>
                    <a href="https://www.nytimes.com" target="_blank" class="link-item" rel="nofollow">纽约时报</a>
                    <a href="https://www.ft.com" target="_blank" class="link-item" rel="nofollow">金融时报</a>
                </div>
            </div>
        </div>
        
        <footer>
            <p>© 2023 简约导航页 | 专注效率与简洁</p>
        </footer>
    </div>
    
    <div class="theme-toggle" id="theme-toggle">
        <i class="fas fa-palette"></i>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const engineSelect = document.getElementById('engine-select');
            const searchInput = document.getElementById('search-input');
            const searchBtn = document.getElementById('search-btn');
            const themeToggle = document.getElementById('theme-toggle');
            
            const engines = {
                baidu: 'https://www.baidu.com/s?wd=',
                google: 'https://www.google.com/search?q=',
                bing: 'https://www.bing.com/search?q=',
                duckduckgo: 'https://duckduckgo.com/?q='
            };
            
            function performSearch() {
                const engine = engines[engineSelect.value];
                const query = searchInput.value.trim();
                
                if (query) {
                    window.open(engine + encodeURIComponent(query), '_blank');
                }
            }
            
            searchBtn.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
            
            engineSelect.value = 'duckduckgo';
            
            const categoryRows = document.querySelectorAll('.category-row');
            categoryRows.forEach((row, index) => {
                setTimeout(() => {
                    row.style.opacity = '0';
                    row.style.transform = 'translateY(15px)';
                    row.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    
                    setTimeout(() => {
                        row.style.opacity = '1';
                        row.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 100);
            });
            
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('flat-theme');
                
                const icon = this.querySelector('i');
                if (document.body.classList.contains('flat-theme')) {
                    icon.className = 'fas fa-eye';
                    this.title = '切换到护眼模式';
                } else {
                    icon.className = 'fas fa-palette';
                    this.title = '切换到扁平模式';
                }
            });
        });
    </script>
</body>
</html>`;