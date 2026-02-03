---
layout: default
title: The Inkwell
---

<div class="container">
    <div class="feed">
        {% comment %}
        Combine all posts from all collections, sort by date (newest first)
        {% endcomment %}
        
        {% assign all_posts = site.poetry | concat: site.sentiment | concat: site.stories | concat: site.prompts | sort: 'date' | reverse %}

        {% for post in all_posts %}
            {% if post.collection == 'poetry' %}
                <div class="card poetry">
                    <div class="card-content">
                        <div class="card-header">📝 Poetry</div>
                        {% if post.title %}
                            <h2 style="font-family: 'Playfair Display', serif; font-size: 1.5rem; text-align: center; margin-bottom: 1rem; color: #3d2817;">{{ post.title }}</h2>
                        {% endif %}
                        <div class="poem-text">{{ post.content }}</div>
                        <div class="card-footer">
                            <span class="timestamp">{{ post.date | date: "%b %d, %Y" }}</span>
                            <div class="action-buttons">
                                <button class="action-btn" onclick="toggleSharePreview(this)">Share</button>
                                <button class="action-btn"><a href="{{ post.url }}" style="color: inherit; text-decoration: none;">Read Full</a></button>
                            </div>
                        </div>
                        <div class="share-preview">
                            <div class="share-preview-meta"><strong>The Inkwell</strong> — Poetry</div>
                            {% if post.title %}<div class="share-preview-meta">"{{ post.title }}"</div>{% endif %}
                            <div class="share-preview-meta">💌 Poetry and Prose by Beau Holliday</div>
                        </div>
                    </div>
                </div>

            {% elsif post.collection == 'sentiment' %}
                <div class="card sentiment">
                    <div class="card-content">
                        <div class="card-header">✨ Sentiment</div>
                        <div class="sentiment-text">{{ post.content }}</div>
                        <div class="card-footer">
                            <span class="timestamp">{{ post.date | date: "%b %d, %Y" }}</span>
                            <div class="action-buttons">
                                <button class="action-btn" onclick="toggleSharePreview(this)">Share</button>
                                <button class="action-btn"><a href="{{ post.url }}" style="color: inherit; text-decoration: none;">Read Full</a></button>
                            </div>
                        </div>
                        <div class="share-preview">
                            <div class="share-preview-meta"><strong>The Inkwell</strong> — Sentiment</div>
                            <div class="share-preview-meta">"{{ post.content | strip_html | truncatewords: 15 }}"</div>
                            <div class="share-preview-meta">💌 Poetry and Prose by Beau Holliday</div>
                        </div>
                    </div>
                </div>

            {% elsif post.collection == 'stories' %}
                <div class="card story">
                    {% if post.cover %}
                        <div class="story-cover">
                            <img src="{{ site.baseurl }}/assets/media/{{ post.cover }}" alt="{{ post.title }} cover">
                        </div>
                    {% endif %}
                    <div class="story-info">
                        <div class="card-header">📖 Short Story</div>
                        <h2 class="story-title">{{ post.title }}</h2>
                        {% if post.excerpt %}
                            <p class="story-excerpt">{{ post.excerpt }}</p>
                        {% endif %}
                        <div class="card-footer">
                            <span class="timestamp">{{ post.date | date: "%b %d, %Y" }}</span>
                            <div class="action-buttons">
                                <button class="action-btn"><a href="{{ post.url }}" style="color: inherit; text-decoration: none;">Read Full Story</a></button>
                                <button class="action-btn" onclick="toggleSharePreview(this)">Share</button>
                            </div>
                        </div>
                        <div class="share-preview">
                            <div class="share-preview-meta"><strong>The Inkwell</strong> — Story</div>
                            <div class="share-preview-meta">"{{ post.title }}"</div>
                            <div class="share-preview-meta">💌 Poetry and Prose by Beau Holliday</div>
                        </div>
                    </div>
                </div>

            {% elsif post.collection == 'prompts' %}
                <div class="card prompt">
                    {% if post.image %}
                        <div class="prompt-background" style="background-image: url('{{ site.baseurl }}/assets/media/{{ post.image }}');"></div>
                    {% endif %}
                    <div class="prompt-overlay"></div>
                    <div class="prompt-content">
                        <h2 class="prompt-title">{{ post.title }}</h2>
                        <p class="prompt-count">
                            {% comment %}
                            Submission count will be auto-calculated from form submissions (later)
                            For now, show 0
                            {% endcomment %}
                            Submissions coming soon
                        </p>
                        <a href="{{ post.url }}" class="prompt-link">View Prompt</a>
                    </div>
                </div>
            {% endif %}

        {% endfor %}

        {% comment %}
        If no posts exist, show welcome message
        {% endcomment %}
        {% if all_posts.size == 0 %}
            <div style="text-align: center; padding: 3rem 2rem;">
                <p style="font-size: 1.1rem; color: #666; font-style: italic;">
                    The pages are still being written. 💌
                </p>
            </div>
        {% endif %}
    </div>
</div>

<script>
function toggleSharePreview(button) {
    const card = button.closest('.card');
    const preview = card ? card.querySelector('.share-preview') : null;
    if (preview) {
        preview.classList.toggle('visible');
    }
}
</script>
