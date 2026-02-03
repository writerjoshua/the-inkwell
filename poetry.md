---
layout: default
title: Poetry — The Inkwell
permalink: /poetry/
---

<div class="container">
    <div class="feed">
        {% for post in site.poetry | sort: 'date' | reverse %}
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
