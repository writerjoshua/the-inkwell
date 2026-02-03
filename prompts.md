---
layout: default
title: Prompts — The Inkwell
permalink: /prompts/
---

<div class="container">
    <div class="feed">
        {% for post in site.prompts | sort: 'date' | reverse %}
            <div class="card prompt">
                {% if post.image %}
                    <div class="prompt-background" style="background-image: url('{{ site.baseurl }}/assets/media/{{ post.image }}');"></div>
                {% endif %}
                <div class="prompt-overlay"></div>
                <div class="prompt-content">
                    <h2 class="prompt-title">{{ post.title }}</h2>
                    <p class="prompt-count">
                        Submissions coming soon
                    </p>
                    <a href="{{ post.url }}" class="prompt-link">View Prompt</a>
                </div>
            </div>
        {% endfor %}
    </div>
</div>
