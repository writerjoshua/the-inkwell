---
layout: default
title: Sentiment — The Inkwell
permalink: /sentiment/
---

<div class="container">
    <div class="feed">
        {% for post in site.sentiment | sort: 'date' | reverse %}
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
