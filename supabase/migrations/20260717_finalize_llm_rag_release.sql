-- Chantier 4 : finaliser et publier le parcours LLM RAG.

WITH target_course AS (
    SELECT id FROM public.courses WHERE slug = 'llm-rag' LIMIT 1
), scores(order_index, points) AS (
    VALUES (0,4),(1,4),(2,4),(3,4),(4,4),(5,4),(6,4),(7,4),(8,3),(9,3),(10,2),(11,0)
)
UPDATE public.modules m
SET platform_points = scores.points,
    is_published = true
FROM target_course c, scores
WHERE m.course_id = c.id
  AND m.order_index = scores.order_index;

UPDATE public.courses
SET is_published = true,
    updated_at = NOW()
WHERE slug = 'llm-rag';
