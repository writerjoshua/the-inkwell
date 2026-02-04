// The Inkwell — SPA Application

// Post Data Structure
const postsData = {
    poetry: [
        {
            id: 'poem-1',
            title: 'In the Margin',
            date: '2026-02-02',
            author: 'Beau Holliday',
            image: '/assets/media/beauholliday.jpg',
            content: `In the margin of your handwriting
I found myself—
a word you circled twice
with such intention
that I knew
you meant it for me.`,
            excerpt: 'A discovery in the margins of handwriting'
        }
    ],
    sentiment: [
        {
            id: 'sentiment-1',
            date: '2026-02-01',
            author: 'Beau Holliday',
            image: '/assets/media/beauholliday.jpg',
            content: `There's something about February—the way it demands vulnerability. Winter strips away pretense, and you're left with only what matters. That's when you know if someone's really there, or just keeping you warm until spring arrives.`,
            excerpt: 'Thoughts on February and vulnerability'
        }
    ],
    stories: [
        {
            id: 'story-1',
            title: 'The Space Between Words',
            date: '2026-01-30',
            author: 'Beau Holliday',
            cover: '/assets/media/beauholliday.jpg',
            image: '/assets/media/beauholliday.jpg',
            excerpt: 'A translator discovers that the gaps in language hold more meaning than the words themselves.',
            content: `A translator discovers that the gaps in language hold more meaning than the words themselves. When she meets the author of an untranslated manuscript, she learns the real story lives in what remains unsaid.

She found the manuscript in a used bookstore, wedged between two oversized art books. The spine was cracked, the pages yellowed. The title was in a language she didn't recognize.

For three weeks, she carried it with her, studying it, learning it. Each sentence revealed something new about the structure, the rhythm, the intention behind the words.

When she finally met the author at a gallery opening, she understood: the spaces between words were where the real magic lived.`
        }
    ],
    prompts: [
        {
            id: 'prompt-1',
            title: 'Letters Never Sent',
            date: '2026-02-02',
            author: 'Beau Holliday',
            image: '/assets/media/beauholliday.jpg',
            content: `Write about a letter—real or imagined—that was never delivered. What did it say? Why was it kept hidden? Does the recipient ever discover it?`,
            submissions: 0
        }
    ]
};

// Page Templates
const pageTemplates = {
    everything: () => renderFeed(),
    poetry: () => renderCollection('poetry'),
    sentiment: () => renderCollection('sentiment'),
    stories: () => renderCollection('stories'),
    prompts: () => renderCollection('prompts'),
    'about-beau': () => renderAbout()
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    loadPage('everything');
    updateMetaTags('The Inkwell', 'Poetry and Prose by American Romance Writer, Beau Holliday', '/assets/media/beauholliday.jpg');
});

// Navigation Setup
function setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const page = e.target.dataset.page;
            loadPage(page);
        });
    });
}

// Load Page
function loadPage(page) {
    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-page="${page}"]`).classList.add('active');

    // Render content
    const contentEl = document.getElementById('content');
    contentEl.innerHTML = '';
    
    if (pageTemplates[page]) {
        const html = pageTemplates[page]();
        contentEl.innerHTML = html;
        setupPostInteractions();
        window.scrollTo(0, 0);
    }
}

// Render Feed (All Posts)
function renderFeed() {
    const allPosts = [
        ...postsData.poetry.map(p => ({ ...p, type: 'poetry' })),
        ...postsData.sentiment.map(p => ({ ...p, type: 'sentiment' })),
        ...postsData.stories.map(p => ({ ...p, type: 'stories' })),
        ...postsData.prompts.map(p => ({ ...p, type: 'prompts' }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (allPosts.length === 0) {
        return `<div class="empty-state"><p>The pages are still being written. 💌</p></div>`;
    }

    return `<div class="feed">${allPosts.map(post => renderPostCard(post)).join('')}</div>`;
}

// Render Collection
function renderCollection(type) {
    const posts = postsData[type] || [];
    
    if (posts.length === 0) {
        return `<div class="empty-state"><p>No ${type} posts yet. 💌</p></div>`;
    }

    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    return `<div class="feed">${sortedPosts.map(post => renderPostCard({ ...post, type })).join('')}</div>`;
}

// Render Post Card
function renderPostCard(post) {
    const { type, id, title, date, author, image, excerpt, content, cover, submissions } = post;
    const dateStr = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    if (type === 'poetry') {
        return `
            <div class="card poetry" data-post-id="${id}" data-type="poetry">
                <div class="card-content">
                    <div class="card-header">📝 Poetry</div>
                    ${title ? `<h2>${title}</h2>` : ''}
                    <div class="poem-text">${escapeHtml(content)}</div>
                    <div class="card-footer">
                        <span class="timestamp">${dateStr}</span>
                        <div class="action-buttons">
                            <button class="action-btn share-btn">Share</button>
                        </div>
                    </div>
                    <div class="share-preview">
                        <div class="share-preview-meta"><strong>The Inkwell</strong> — Poetry</div>
                        ${title ? `<div class="share-preview-meta">"${escapeHtml(title)}"</div>` : ''}
                        <div class="share-preview-meta">💌 Poetry and Prose by Beau Holliday</div>
                    </div>
                </div>
            </div>
        `;
    }

    if (type === 'sentiment') {
        return `
            <div class="card sentiment" data-post-id="${id}" data-type="sentiment">
                <div class="card-content">
                    <div class="card-header">✨ Sentiment</div>
                    <div class="sentiment-text">${escapeHtml(content)}</div>
                    <div class="card-footer">
                        <span class="timestamp">${dateStr}</span>
                        <div class="action-buttons">
                            <button class="action-btn share-btn">Share</button>
                        </div>
                    </div>
                    <div class="share-preview">
                        <div class="share-preview-meta"><strong>The Inkwell</strong> — Sentiment</div>
                        <div class="share-preview-meta">"${escapeHtml(content.substring(0, 60))}..."</div>
                        <div class="share-preview-meta">💌 Poetry and Prose by Beau Holliday</div>
                    </div>
                </div>
            </div>
        `;
    }

    if (type === 'stories') {
        return `
            <div class="card story" data-post-id="${id}" data-type="stories">
                <div class="story-cover">
                    <img src="${cover}" alt="${title}">
                </div>
                <div class="story-info">
                    <div class="card-header">📖 Short Story</div>
                    <h2 class="story-title">${escapeHtml(title)}</h2>
                    <p class="story-excerpt">${escapeHtml(excerpt)}</p>
                    <div class="card-footer">
                        <span class="timestamp">${dateStr}</span>
                        <div class="action-buttons">
                            <button class="action-btn read-story-btn">Read Full Story</button>
                            <button class="action-btn share-btn">Share</button>
                        </div>
                    </div>
                    <div class="share-preview">
                        <div class="share-preview-meta"><strong>The Inkwell</strong> — Story</div>
                        <div class="share-preview-meta">"${escapeHtml(title)}"</div>
                        <div class="share-preview-meta">💌 Poetry and Prose by Beau Holliday</div>
                    </div>
                </div>
            </div>
        `;
    }

    if (type === 'prompts') {
        return `
            <div class="card prompt" data-post-id="${id}" data-type="prompts">
                <div class="prompt-background" style="background-image: url('${image}');"></div>
                <div class="prompt-overlay"></div>
                <div class="prompt-content">
                    <h2 class="prompt-title">${escapeHtml(title)}</h2>
                    <p class="prompt-count">${submissions} submission${submissions !== 1 ? 's' : ''}</p>
                    <button class="prompt-link view-prompt-btn">View Prompt</button>
                </div>
            </div>
        `;
    }
}

// Render Full Story Page
function renderStoryPage(postId) {
    const post = postsData.stories.find(p => p.id === postId);
    if (!post) return '';

    const dateStr = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    return `
        <div style="max-width: 900px; margin: 0 auto;">
            <div class="card story" style="border-left: 6px solid #8b7355; display: flex; flex-direction: column;">
                <div class="card-content">
                    <div class="card-header">📖 Short Story</div>
                    <h2 class="story-title">${escapeHtml(post.title)}</h2>
                    
                    <div style="background: white; border: 2px solid #8b7355; padding: 2rem; margin: 2rem 0; position: relative;">
                        <div style="position: relative; z-index: 2; font-size: 1rem; line-height: 1.8; color: #444;">
                            ${escapeHtml(post.content).replace(/\n\n/g, '</p><p>')}
                        </div>
                    </div>
                    
                    <div class="card-footer">
                        <span class="timestamp">${dateStr}</span>
                        <div class="action-buttons">
                            <button class="action-btn back-to-feed">Back to Stories</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render Prompt Page
function renderPromptPage(postId) {
    const post = postsData.prompts.find(p => p.id === postId);
    if (!post) return '';

    return `
        <div style="max-width: 900px; margin: 0 auto;">
            <div class="card prompt" style="min-height: auto; margin-bottom: 2rem;">
                <div class="prompt-background" style="background-image: url('${post.image}');"></div>
                <div class="prompt-overlay"></div>
                <div class="prompt-content">
                    <h2 class="prompt-title">${escapeHtml(post.title)}</h2>
                    <p class="prompt-count">${post.submissions} submission${post.submissions !== 1 ? 's' : ''}</p>
                </div>
            </div>

            <div class="card" style="border: 2px solid #8b7355; margin-bottom: 2rem;">
                <div class="card-content">
                    <h3 class="section-title">The Prompt</h3>
                    <div style="font-size: 1rem; line-height: 1.8; color: #444;">
                        ${escapeHtml(post.content)}
                    </div>
                </div>
            </div>

            <div class="card" style="border: 2px solid #8b7355; background: linear-gradient(135deg, #fffbf5 0%, #fef5e7 100%);;">
                <div class="card-content">
                    <h3 class="section-title">Share Your Response</h3>
                    <form style="display: flex; flex-direction: column; gap: 1rem;">
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; letter-spacing: 1px; font-size: 0.9rem;">Your Name (optional)</label>
                            <input type="text" placeholder="Leave blank for anonymous" style="width: 100%; padding: 0.8rem; border: 1px solid #8b7355; font-family: 'Courier Prime', monospace; background: white;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; letter-spacing: 1px; font-size: 0.9rem;">Your Response</label>
                            <textarea placeholder="Write your response here..." style="width: 100%; padding: 1rem; border: 1px solid #8b7355; font-family: 'Courier Prime', monospace; min-height: 200px; resize: vertical; background: white;"></textarea>
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; letter-spacing: 1px; font-size: 0.9rem;">Email (for your reference, not published)</label>
                            <input type="email" placeholder="your@email.com" style="width: 100%; padding: 0.8rem; border: 1px solid #8b7355; font-family: 'Courier Prime', monospace; background: white;">
                        </div>
                        <button type="submit" style="background: #8b7355; color: white; border: none; padding: 0.8rem 1.5rem; font-family: 'Courier Prime', monospace; font-size: 0.9rem; cursor: pointer; letter-spacing: 1px; transition: all 0.3s ease; align-self: flex-start;">Submit Response</button>
                    </form>
                    <p style="margin-top: 1rem; font-size: 0.85rem; color: #888; font-style: italic;">
                        💌 Your submission helps shape this creative conversation. Thank you for participating.
                    </p>
                </div>
            </div>

            <button class="back-to-feed" style="margin-top: 2rem; background: transparent; border: none; color: #8b7355; text-decoration: underline; cursor: pointer; font-family: 'Courier Prime', monospace; font-size: 0.95rem;">← Back to Prompts</button>
        </div>
    `;
}

// Render About Page
function renderAbout() {
    return `
        <div style="max-width: 900px; margin: 0 auto;">
            <div class="about-section">
                <div class="about-content">
                    <h2 class="section-title">About Beau Holliday</h2>
                    
                    <p class="bio-text">
                        Beau Holliday is an old soul from the Southwest, published independently, pursuing shamelessness through song, poem, and prose.
                    </p>

                    <img src="/assets/media/profile-image.jpg" alt="Beau Holliday" class="profile-image" style="display: none;">

                    <div class="bio-highlight">
                        An American musician, writer, romance author, and poet—Beau's presence weaves across web and social media with an obsession for the romantic and sensual. Drawing from the psychological and spiritual aspects of sex, the history and mysticism of desire, these explorations manifest in pseudo-fictional fantasies, academic pursuits, and philosophical ponderings within unique and intriguing artistic endeavors, both online and off.
                    </div>

                    <p class="bio-text">
                        At the heart of The Inkwell lies a philosophy: <em>that vulnerability is a language all its own, that desire deserves to be explored without apology, and that the spaces between words often hold more truth than the words themselves.</em>
                    </p>

                    <p class="bio-text">
                        Beau's work spans across mediums—music that echoes with longing, poetry that cuts to the bone, short stories that linger in the margins of your thoughts. Each piece is an invitation to sit with the uncomfortable, the beautiful, and the deeply human experience of connection.
                    </p>
                </div>
            </div>

            <div class="about-section">
                <div class="about-content">
                    <h2 class="section-title">Artistic Mediums</h2>
                    
                    <ul class="mediums-list">
                        <li>Music & Songwriting</li>
                        <li>Poetry & Verse</li>
                        <li>Prose & Short Stories</li>
                        <li>Essay & Philosophical Writing</li>
                        <li>Academic Exploration</li>
                    </ul>

                    <p class="bio-text" style="margin-top: 1.5rem;">
                        Each medium is a different language for the same obsession: understanding desire, intimacy, and the mysterious pull between two souls.
                    </p>
                </div>
            </div>

            <div class="contact-section">
                <div class="contact-content">
                    <h2 class="section-title">Connect with Beau</h2>
                    
                    <div class="contact-item">
                        <div class="contact-label">Website</div>
                        <div class="contact-value">
                            <a href="https://www.BeauHolliday.com" target="_blank">www.BeauHolliday.com</a>
                        </div>
                    </div>

                    <div class="contact-item">
                        <div class="contact-label">Phone</div>
                        <div class="contact-value">
                            <a href="tel:+13054324849">+1 (305) 432-4849</a>
                        </div>
                    </div>

                    <div class="contact-item">
                        <div class="contact-label">Location</div>
                        <div class="contact-value">
                            Southwest & Montreal
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Setup Post Interactions
function setupPostInteractions() {
    // Share buttons
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const preview = card.querySelector('.share-preview');
            if (preview) {
                preview.classList.toggle('visible');
            }
        });
    });

    // Read Full Story buttons
    document.querySelectorAll('.read-story-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const postId = card.dataset.postId;
            const contentEl = document.getElementById('content');
            contentEl.innerHTML = renderStoryPage(postId);
            setupPostInteractions();
            window.scrollTo(0, 0);
        });
    });

    // View Prompt buttons
    document.querySelectorAll('.view-prompt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const postId = card.dataset.postId;
            const contentEl = document.getElementById('content');
            contentEl.innerHTML = renderPromptPage(postId);
            setupPostInteractions();
            window.scrollTo(0, 0);
        });
    });

    // Back to feed buttons
    document.querySelectorAll('.back-to-feed').forEach(btn => {
        btn.addEventListener('click', () => {
            loadPage('everything');
        });
    });
}

// Update Meta Tags
function updateMetaTags(title, description, image) {
    document.querySelector('meta[property="og:title"]').setAttribute('content', title);
    document.querySelector('meta[property="og:description"]').setAttribute('content', description);
    document.querySelector('meta[property="og:image"]').setAttribute('content', image);
    document.querySelector('meta[name="twitter:title"]').setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]').setAttribute('content', description);
    document.querySelector('meta[name="twitter:image"]').setAttribute('content', image);
}

// Escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
