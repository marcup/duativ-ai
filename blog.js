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
        // Using rss2json service instead of CORS proxy
        const RSS2JSON_URL = 'https://api.rss2json.com/v1/api.json';
        const MEDIUM_RSS_URL = 'https://medium.com/feed/@duativai';
        
        const response = await fetch(`${RSS2JSON_URL}?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status !== 'ok') {
            throw new Error('Failed to fetch RSS feed');
        }
        
        // Transform the response to match our expected format
        return data.items.map(item => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            content: item.content,
            contentSnippet: item.description.replace(/<[^>]*>/g, "")
        })).slice(0, 5); // Get only the latest 5 posts
        
    } catch (error) {
        console.error('Error fetching Medium posts:', error);
        const blogPostsContainer = document.getElementById('blog-posts');
        if (blogPostsContainer) {
            blogPostsContainer.innerHTML = '<p class="error">Unable to load blog posts. Please check our <a href="https://medium.com/@duativai" target="_blank" rel="noopener">Medium page</a> directly.</p>';
        }
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
        <a href="${post.link}" target="_blank" rel="noopener" class="blog-image">
            <img src="${imageUrl}" alt="${post.title}" loading="lazy">
        </a>
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
    if (!blogPostsContainer) return;

    const posts = await fetchMediumPosts();

    if (posts.length === 0) {
        return; // Error message already handled in fetchMediumPosts
    }

    blogPostsContainer.innerHTML = '';
    posts.forEach(post => {
        blogPostsContainer.appendChild(createPostElement(post));
    });
}

// Initialize the blog
document.addEventListener('DOMContentLoaded', displayPosts);