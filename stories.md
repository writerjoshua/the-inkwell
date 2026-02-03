---
layout: default
title: Stories — The Inkwell
permalink: /stories/
---

<div class="container">
    <div class="feed">
        {% for post in site.stories | sort: 'date' | reverse %}
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
        {% endfor %}
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
