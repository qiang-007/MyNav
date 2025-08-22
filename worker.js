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
    <title>护眼导航页</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #e0f7fa, #c8e6c9, #dcedc8);
            min-height: 100vh;
            padding: 12px;
            color: #2c3e50;
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite;
            transition: all 0.5s ease;
        }
        
        /* 扁平化风格 */
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
            font-size: 1.6rem;
            margin-bottom: 8px;
            color: #2c3e50;
            font-weight: 500;
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
        
        .search-container:focus-within {
            box-shadow: 0 4px 15px rgba(52, 152, 219, 0.2);
            background: rgba(255, 255, 255, 0.95);
        }
        
        .search-engine-selector {
            display: flex;
            align-items: center;
            padding: 0 12px;
            border-right: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .engine-icon {
            font-size: 16px;
            color: #3498db;
            margin-right: 6px;
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
        
        .search-input {
            flex: 1;
            padding: 10px 12px;
            border: none;
            font-size: 14px;
            outline: none;
            background: transparent;
            color: #2c3e50;
        }
        
        .search-input::placeholder {
            color: rgba(44, 62, 80, 0.5);
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
        
        .search-btn:hover {
            background: #2980b9;
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
        
        .category-row:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
        }
        
        /* 扁平化风格下的分类行 */
        body.flat-theme .category-row {
            background: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            border: 1px solid #eaeaea;
        }
        
        .category-header {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            background: rgba(52, 152, 219, 0.1);
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        /* 扁平化风格下的分类标题 */
        body.flat-theme .category-header {
            background: #f0f7ff;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .category-icon {
            font-size: 14px;
            width: 28px;
            height: 28px;
            background: rgba(52, 152, 219, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 8px;
            color: #3498db;
        }
        
        .category-title {
            font-size: 1.0rem;
            color: #2c3e50;
            font-weight: 500;
        }
        
        .links-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 10px;
            padding: 10px;
        }
        
        .link-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: #2c3e50;
            padding: 8px 6px;
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.6);
            transition: all 0.3s ease;
            height: 75px;
            justify-content: center;
        }
        
        .link-item:hover {
            background: rgba(255, 255, 255, 0.9);
            transform: translateY(-3px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        /* 扁平化风格下的链接项 */
        body.flat-theme .link-item {
            background: #f8f9fa;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        body.flat-theme .link-item:hover {
            background: #e9ecef;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
        }
        
        .link-icon {
            font-size: 22px;
            margin-bottom: 5px;
            color: #3498db;
        }
        
        .link-text {
            font-size: 13px;
            text-align: center;
            word-break: break-word;
            line-height: 1.3;
            font-weight: 500;
            max-width: 100%;
            padding: 0 4px;
        }
        
        footer {
            text-align: center;
            padding: 12px;
            color: rgba(44, 62, 80, 0.7);
            font-size: 12px;
            border-top: 1px solid rgba(0, 0, 0, 0.05);
            margin-top: 15px;
        }
        
        /* 风格切换按钮 - 变小了 */
        .theme-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px; /* 变小了 */
            height: 40px; /* 变小了 */
            border-radius: 50%;
            background: #3498db;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        
        .theme-toggle i {
            font-size: 18px; /* 变小了 */
        }
        
        /* 大屏幕优化 */
        @media (min-width: 1025px) {
            .link-item {
                padding: 10px 8px;
                height: 75px;
            }
            
            .link-icon {
                font-size: 24px;
            }
            
            .link-text {
                font-size: 14px;
            }
        }
        
        /* 小屏幕适配 */
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
            
            select {
                width: 120px;
            }
            
            .search-btn {
                margin-top: 8px;
                width: 100%;
            }
            
            .category-header {
                padding: 6px 10px;
            }
            
            .category-icon {
                display: none; /* 隐藏分类图标 */
            }
            
            .category-title {
                font-size: 1.1rem;
                text-align: center;
                width: 100%;
            }
            
            .links-container {
                grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                gap: 8px;
                padding: 8px;
            }
            
            .link-item {
                padding: 12px 6px;
                height: auto;
                min-height: 50px;
                justify-content: center;
            }
            
            .link-icon {
                display: none; /* 隐藏链接图标 */
            }
            
            .link-text {
                font-size: 14px;
                line-height: 1.4;
                font-weight: 600;
                padding: 0;
            }
            
            /* 小屏幕下的风格切换按钮 */
            .theme-toggle {
                width: 36px; /* 更小 */
                height: 36px; /* 更小 */
                bottom: 15px;
                right: 15px;
            }
            
            .theme-toggle i {
                font-size: 16px; /* 更小 */
            }
        }
        
        /* 超小屏幕适配 */
        @media (max-width: 480px) {
            .links-container {
                grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
                gap: 6px;
            }
            
            .link-item {
                padding: 6px 4px;
                height: 65px;
            }
            
            .link-text {
                font-size: 11px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <i class="fas fa-compass"></i> 护眼导航
            </div>
            
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
                    <a href="https://github.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fab fa-github link-icon"></i>
                        <span class="link-text">GitHub</span>
                    </a>
                    <a href="https://gitee.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-code-branch link-icon"></i>
                        <span class="link-text">Gitee</span>
                    </a>
                    <a href="https://stackoverflow.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fab fa-stack-overflow link-icon"></i>
                        <span class="link-text">Stack Overflow</span>
                    </a>
                    <a href="https://zhihu.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-question-circle link-icon"></i>
                        <span class="link-text">知乎</span>
                    </a>
                    <a href="https://bilibili.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-play-circle link-icon"></i>
                        <span class="link-text">哔哩哔哩</span>
                    </a>
                    <a href="https://youtube.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fab fa-youtube link-icon"></i>
                        <span class="link-text">YouTube</span>
                    </a>
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
                    <a href="https://binance.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-coins link-icon"></i>
                        <span class="link-text">币安</span>
                    </a>
                    <a href="https://coinbase.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-wallet link-icon"></i>
                        <span class="link-text">Coinbase</span>
                    </a>
                    <a href="https://okx.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-exchange-alt link-icon"></i>
                        <span class="link-text">OKX</span>
                    </a>
                    <a href="https://huobi.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-fire link-icon"></i>
                        <span class="link-text">火币</span>
                    </a>
                    <a href="https://kraken.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-dragon link-icon"></i>
                        <span class="link-text">Kraken</span>
                    </a>
                    <a href="https://bybit.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-chart-line link-icon"></i>
                        <span class="link-text">Bybit</span>
                    </a>
                    <a href="https://www.gate.io" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-door-open link-icon"></i>
                        <span class="link-text">Gate.io</span>
                    </a>
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
                    <a href="https://openai.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-brain link-icon"></i>
                        <span class="link-text">OpenAI</span>
                    </a>
                    <a href="https://deepmind.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-infinity link-icon"></i>
                        <span class="link-text">DeepMind</span>
                    </a>
                    <a href="https://huggingface.co" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-smile link-icon"></i>
                        <span class="link-text">Hugging Face</span>
                    </a>
                    <a href="https://www.midjourney.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-image link-icon"></i>
                        <span class="link-text">Midjourney</span>
                    </a>
                    <a href="https://stability.ai" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-project-diagram link-icon"></i>
                        <span class="link-text">Stable Diffusion</span>
                    </a>
                    <a href="https://www.anthropic.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-robot link-icon"></i>
                        <span class="link-text">Claude</span>
                    </a>
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
                    <a href="https://reuters.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-globe-americas link-icon"></i>
                        <span class="link-text">路透社</span>
                    </a>
                    <a href="https://bbc.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-tv link-icon"></i>
                        <span class="link-text">BBC新闻</span>
                    </a>
                    <a href="https://cnbc.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-chart-line link-icon"></i>
                        <span class="link-text">CNBC</span>
                    </a>
                    <a href="https://www.theguardian.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-shield-alt link-icon"></i>
                        <span class="link-text">卫报</span>
                    </a>
                    <a href="https://www.nytimes.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-newspaper link-icon"></i>
                        <span class="link-text">纽约时报</span>
                    </a>
                    <a href="https://www.ft.com" target="_blank" class="link-item" rel="nofollow">
                        <i class="fas fa-money-bill-wave link-icon"></i>
                        <span class="link-text">金融时报</span>
                    </a>
                </div>
            </div>
        </div>
        
        <footer>
            <p>© 2023 护眼导航页 | 使用Font Awesome图标库</p>
        </footer>
    </div>
    
    <!-- 风格切换按钮 - 变小了 -->
    <div class="theme-toggle" id="theme-toggle">
        <i class="fas fa-palette"></i>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const engineSelect = document.getElementById('engine-select');
            const searchInput = document.getElementById('search-input');
            const searchBtn = document.getElementById('search-btn');
            const themeToggle = document.getElementById('theme-toggle');
            
            // 搜索引擎配置
            const engines = {
                baidu: 'https://www.baidu.com/s?wd=',
                google: 'https://www.google.com/search?q=',
                bing: 'https://www.bing.com/search?q=',
                duckduckgo: 'https://duckduckgo.com/?q='
            };
            
            // 搜索功能
            function performSearch() {
                const engine = engines[engineSelect.value];
                const query = searchInput.value.trim();
                
                if (query) {
                    window.open(engine + encodeURIComponent(query), '_blank');
                }
            }
            
            // 事件监听
            searchBtn.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
            
            // 设置默认搜索引擎为DuckDuckGo
            engineSelect.value = 'duckduckgo';
            
            // 添加动画效果
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
            
            // 主题切换功能
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('flat-theme');
                
                // 更新按钮图标
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