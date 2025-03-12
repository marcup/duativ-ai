// Function to parse XML string to JSON
function parseXML(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    const items = xmlDoc.getElementsByTagName("item");
    
    return Array.from(items).map(item => ({
        title: item.getElementsByTagName("title")[0]?.textContent || "",
        link: item.getElementsByTagName("link")[0]?.textContent || "",
        pubDate: item.getElementsByTagName("pubDate")[0]?.textContent || "",
        content: item.getElementsByTagName("content:encoded")[0]?.textContent || 
                item.getElementsByTagName("description")[0]?.textContent || "",
        contentSnippet: (item.getElementsByTagName("description")[0]?.textContent || "").replace(/<[^>]*>/g, "")
    }));
}

async function fetchMediumPosts() {
    try {
        const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
        const MEDIUM_RSS_URL = 'https://medium.com/feed/@duativai';
        
        const response = await fetch(CORS_PROXY + encodeURIComponent(MEDIUM_RSS_URL));
        const xml = await response.text();
        const items = parseXML(xml);
        return items.slice(0, 5); // Get only the latest 5 posts
    } catch (error) {
        console.error('Error fetching Medium posts:', error);
        return [];
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'blog-card';
    
    // Extract the first image from the content if available
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content;
    const firstImage = tempDiv.querySelector('img');
    const imageUrl = firstImage ? firstImage.src : 'https://placehold.co/600x400/e5e7eb/1f2937?text=Duativ+Blog';

    article.innerHTML = `
        <div class="blog-image">
            <img src="${imageUrl}" alt="${post.title}">
        </div>
        <div class="blog-content">
            <h2>${post.title}</h2>
            <div class="blog-meta">
                <span class="blog-date">${formatDate(post.pubDate)}</span>
            </div>
            <p>${post.contentSnippet.slice(0, 150)}...</p>
            <a href="${post.link}" target="_blank" rel="noopener" class="read-more">Read More</a>
        </div>
    `;

    return article;
}

async function displayPosts() {
    const blogPostsContainer = document.getElementById('blog-posts');
    const posts = await fetchMediumPosts();

    if (posts.length === 0) {
        blogPostsContainer.innerHTML = '<p class="error">Unable to load blog posts. Please try again later.</p>';
        return;
    }

    blogPostsContainer.innerHTML = '';
    posts.forEach(post => {
        blogPostsContainer.appendChild(createPostElement(post));
    });
}

// Initialize the blog
displayPosts();