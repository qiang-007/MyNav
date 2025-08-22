addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    return new Response(getHTML(), {
        headers: { 
            'content-type': 'text/html; charset=utf-8',
            'cache-control': 'public, max-age=3600'
        }
    })
}

// 分类、链接名称和链接数据 - 放在顶部方便编辑
const categoriesData = [
    {
        "id": "common",
        "title": "常用网站",
        "icon": "fas fa-star",
        "links": [
            {"name": "GitHub", "url": "https://github.com", "description": "全球最大的代码托管平台"},
            {"name": "Cloudflare", "url": "https://dash.cloudflare.com", "description": "网络云平台"},
            {"name": "52论坛", "url": "https://52.pojie.com", "description": "网络技术交流来论坛"},
            {"name": "哔哩哔哩", "url": "https://bilibili.com", "description": "中国年轻人文化社区"},
            {"name": "YouTube", "url": "https://youtube.com", "description": "全球最大的视频分享平台"}
        ]
    },
    {
        "id": "ai",
        "title": "AI",
        "icon": "fas fa-robot",
        "links": [
            {"name": "Gemini", "url": "https://gemini.google.com/", "description": "Google推出的AI助手"},
            {"name": "元宝", "url": "https://yuanbao.tencent.com/", "description": "腾讯推出的AI助手"},
            {"name": "豆包", "url": "https://www.doubao.com/", "description": "字节跳动推出的AI助手"},
			{"name": "扣子CN", "url": "https://space.coze.cn/", "description": "字节跳动推出的适合企业和团队的复杂工作流。"},
			{"name": "扣子EN", "url": "https://www.coze.com/", "description": "字节跳动推出的适合企业和团队的复杂工作流。"},
            {"name": "ima知识库", "url": "https://ima.qq.com/", "description": "智能知识管理与问答平台"}
        ]
    },
    {
        "id": "ipo",
        "title": "IPO与投融资",
        "icon": "fas fa-chart-line",
        "links": [
            {"name": "深交所", "url": "http://listing.szse.cn/projectdynamic/ipo/index.html", "description": "深交所项目动态"},
            {"name": "上交所", "url": "https://www.sse.com.cn/listing/renewal/ipo/", "description": "上交所项目动态"},
            {"name": "北交所", "url": "https://www.bse.cn/audit/project_news.html", "description": "北交所项目动态"},
            {"name": "港交所", "url": "https://sc.hkexnews.hk/TuniS/www.hkexnews.hk/index_c.htm", "description": "香港IPO项目动态-披露易"},
            {"name": "美国证监会", "url": "https://www.sec.gov/search-filings", "description": "美国证监会IPO审核动态"},
			{"name": "iposcoop", "url": "https://www.iposcoop.com/ipo-calendar/", "description": "第三方美股IPO动态"},
			{"name": "产业通", "url": "https://chanyeos.com/smart-ke-b/#/home/homeSearch", "description": "各领域企业、园区信息聚合"},
			{"name": "36氪创投", "url": "https://pitchhub.36kr.com/", "description": "融资新闻,创业项目,投资人动态,企业资讯,融资快报,项目信息"},
			{"name": "未来智库", "url": "https://www.vzkoo.com/", "description": "各领域行研报告"},
			{"name": "中财数据", "url": "https://data.cfi.cn/cfidata.aspx", "description": "二级市场数据"},
			{"name": "同花顺数据", "url": "https://data.10jqka.com.cn/###", "description": "龙虎榜、业绩预告、资金流向、大宗交易等"}
        ]
    },
    {
        "id": "legal",
        "title": "法律",
        "icon": "fas fa-gavel",
        "links": [
            {"name": "证期法规", "url": "http://www.csrc.gov.cn/pub/newsite/flb/flfg/", "description": "证监会法律法规数据库"},
            {"name": "裁判文书网", "url": "https://wenshu.court.gov.cn/", "description": "中国裁判文书公开平台"},
            {"name": "执行信息网", "url": "https://zxgk.court.gov.cn/", "description": "全国法院被执行人信息查询"},
            {"name": "诉讼资产网", "url": "https://www.rmfysszc.gov.cn/", "description": "人民法院诉讼资产网"},
            {"name": "阿里拍卖", "url": "https://sf.taobao.com/", "description": "司法拍卖平台"},
            {"name": "openlaw", "url": "https://openlaw.cn/", "description": "法律案例检索平台"}
        ]
    },
    {
        "id": "certification",
        "title": "资质认定",
        "icon": "fas fa-certificate",
        "links": [
            {"name": "高新企业", "url": "http://www.innocom.gov.cn/", "description": "高新技术企业认定管理工作网"}
        ]
    },
    {
        "id": "credit",
        "title": "公示查询",
        "icon": "fas fa-credit-card",
        "links": [
			{"name": "信用江苏", "url": "https://credit.jiangsu.gov.cn/credit/xyfw/index.jhtml", "description": "江苏省企业信用查询"},
			{"name": "信用上海", "url": "https://credit.fgw.sh.gov.cn/index.html", "description": "上海市企业信用查询"},
            {"name": "征信中心", "url": "https://ipcrs.pbccrc.org.cn/", "description": "中国人民银行征信中心"},
            {"name": "学信网", "url": "https://www.chsi.com.cn/", "description": "中国高等教育学生信息网"},
            {"name": "合规证明", "url": "https://ydzt.jszwfw.gov.cn/qyxxhcxtweb/#/", "description": "江苏省企业合规证明办理（含线上线下）"},			
            {"name": "证券失信查询", "url": "http://neris.csrc.gov.cn/shixinchaxun/", "description": "证券期货市场失信记录查询平台"},
            {"name": "私募基金公示", "url": "https://gs.amac.org.cn/amac-infodisc/res/pof/fund/index.html", "description": "中国证券投资投资基金业协会-私募基金公示"},
            {"name": "私募管理人", "url": "https://gs.amac.org.cn/amac-infodisc/res/pof/manager/managerList.html", "description": "中国证券投资投资基金业协会-私募基金管理人公示"}
        ]
    },
    {
        "id": "government",
        "title": "政务中心",
        "icon": "fas fa-landmark",
        "links": [
            {"name": "苏州政务", "url": "https://sz.jszwfw.gov.cn/", "description": "苏州市政务服务中心"},
            {"name": "园区政务", "url": "https://szgyy.jszwfw.gov.cn/", "description": "苏州工业园区管委会政务服务中心"},
            {"name": "园区企服", "url": "https://sme.sipac.gov.cn/epheadline/home", "description": "苏州工业园区企业服务中心"},
			{"name": "12333", "url": "https://si.12333.gov.cn/index.jhtml", "description": "国家社保服务-养老、失业、工伤保险"},
			{"name": "江苏医保云", "url": "https://ybj.jszwfw.gov.cn/hsa-local/web/hallEnter/#/Index", "description": "江苏省医疗保障局网上服务大厅"},
			{"name": "江苏人社", "url": "https://rs.jshrss.jiangsu.gov.cn/index/", "description": "江苏省人社厅网上服务大厅-个人、企业"}
        ]
    },
    {
        "id": "tech",
        "title": "IT技术",
        "icon": "fas fa-code",
        "links": [
            {"name": "Github", "url": "https://github.com/", "description": "全球最大的代码托管平台"},
            {"name": "cloudflare", "url": "https://www.cloudflare.com/", "description": "全球领先的CDN和安全服务提供商"},
            {"name": "腾讯云", "url": "https://cloud.tencent.com/", "description": "腾讯云计算服务平台"},
            {"name": "阿里云", "url": "https://www.aliyun.com/", "description": "阿里巴巴云计算服务平台"},
            {"name": "七牛", "url": "https://www.qiniu.com/", "description": "七牛云存储服务"},
            {"name": "又拍云", "url": "https://www.upyun.com/", "description": "又拍云存储服务"}
        ]
    }
];

function getHTML() {
    return `<!DOCTYPE html>
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
            position: relative;
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
        
        /* 链接描述工具提示样式 */
        .link-item .tooltip {
            visibility: hidden;
            width: 200px;
            background-color: #333;
            color: white;
            text-align: center;
            border-radius: 6px;
            padding: 5px;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -100px;
            opacity: 0;
            transition: opacity 0.3s;
            font-size: 12px;
            font-weight: normal;
            pointer-events: none;
        }
        
        .link-item .tooltip::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: #333 transparent transparent transparent;
        }
        
        .link-item:hover .tooltip {
            visibility: visible;
            opacity: 1;
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
        
        <div class="categories-container" id="categories-container">
            <!-- 分类内容将通过JavaScript动态生成 -->
        </div>
        
        <footer>
            <p>© 2023 简约导航页 | 专注效率与简洁</p>
        </footer>
    </div>
    
    <div class="theme-toggle" id="theme-toggle">
        <i class="fas fa-palette"></i>
    </div>

    <script>
        // 分类、链接名称和链接数据
        const categoriesData = ${JSON.stringify(categoriesData)};
        
        // 生成分类和链接的HTML
        function generateCategoriesHTML() {
            const container = document.getElementById('categories-container');
            container.innerHTML = '';
            
            categoriesData.forEach(category => {
                const categoryRow = document.createElement('div');
                categoryRow.className = 'category-row';
                
                const categoryHeader = document.createElement('div');
                categoryHeader.className = 'category-header';
                
                const categoryIcon = document.createElement('div');
                categoryIcon.className = 'category-icon';
                categoryIcon.innerHTML = '<i class="' + category.icon + '"></i>';
                
                const categoryTitle = document.createElement('h2');
                categoryTitle.className = 'category-title';
                categoryTitle.textContent = category.title;
                
                categoryHeader.appendChild(categoryIcon);
                categoryHeader.appendChild(categoryTitle);
                
                const linksContainer = document.createElement('div');
                linksContainer.className = 'links-container';
                
                category.links.forEach(link => {
                    const linkItem = document.createElement('a');
                    linkItem.className = 'link-item';
                    linkItem.href = link.url;
                    linkItem.target = '_blank';
                    linkItem.rel = 'nofollow';
                    linkItem.textContent = link.name;
                    
                    // 添加描述工具提示
                    if (link.description) {
                        const tooltip = document.createElement('span');
                        tooltip.className = 'tooltip';
                        tooltip.textContent = link.description;
                        linkItem.appendChild(tooltip);
                    }
                    
                    linksContainer.appendChild(linkItem);
                });
                
                categoryRow.appendChild(categoryHeader);
                categoryRow.appendChild(linksContainer);
                container.appendChild(categoryRow);
            });
        }

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
            
            // 生成分类和链接
            generateCategoriesHTML();
            
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
    <\/script>
</body>
</html>`;
}