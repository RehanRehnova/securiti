import os
import frontmatter
import markdown
from datetime import datetime

POSTS_DIR = 'content/posts'

def get_all_articles():
    articles = []
    
    if not os.path.exists(POSTS_DIR):
        return articles
    
    for filename in sorted(os.listdir(POSTS_DIR), reverse=True):
        if not filename.endswith('.md'):
            continue
            
        filepath = os.path.join(POSTS_DIR, filename)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                post = frontmatter.load(f)
                
                # Skip drafts
                if post.get('draft', False):
                    continue
                
                # Convert markdown to HTML for blog_template.html
                html_content = markdown.markdown(
                    post.content, 
                    extensions=['fenced_code', 'tables', 'nl2br', 'codehilite']
                )
                
                # Return same structure your template already expects
                articles.append({
                    'slug': post['slug'],
                    'title': post['title'],
                    'date': post['date'].strftime('%b %d, %Y') if isinstance(post['date'], datetime) else str(post['date']),
                    'category': post['category'],
                    'excerpt': post['excerpt'],
                    'content': html_content,  # blog_template.html uses this
                    'thumbnail': post.get('thumbnail', ''),
                    'author': post.get('author', 'Rehan Khan'),
                    'author_role': post.get('author_role', 'Founder & CTO'),
                    'author_avatar': post.get('author_avatar', ''),
                    'author_bio': post.get('author_bio', ''),
                    'author_social': post.get('author_social', []),
                    'tags': post.get('tags', []),
                    'read_time': post.get('read_time', '5 min read'),
                    'featured': post.get('featured', False)
                })
        except Exception as e:
            print(f"Error loading {filename}: {e}")
            continue
    
    # Sort by date, newest first
    return sorted(articles, key=lambda x: x['date'], reverse=True)

def get_article_by_slug(slug):
    articles = get_all_articles()
    return next((a for a in articles if a['slug'] == slug), None)

def get_categories():
    articles = get_all_articles()
    return sorted(list(set(a['category'] for a in articles if a.get('category'))))

def get_related_articles(current_slug, limit=3):
    current = get_article_by_slug(current_slug)
    if not current:
        return []
    articles = get_all_articles()
    related = [a for a in articles if a['slug']!= current_slug and a['category'] == current['category']]
    return related[:limit]
