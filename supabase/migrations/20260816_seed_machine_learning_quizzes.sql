-- KORYXA FORMATION — MACHINE LEARNING AVEC PYTHON — CHANTIER 5
-- 48 quiz de modules et 12 questions finales. Tout reste inactif.

ALTER TABLE public.quiz_questions
ADD COLUMN IF NOT EXISTS question_type TEXT NOT NULL DEFAULT 'qcm'
CHECK (question_type IN ('qcm','true_false','comprehension','mini_challenge')),
ADD COLUMN IF NOT EXISTS is_final_test BOOLEAN NOT NULL DEFAULT FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='machine-learning-python' AND m.order_index=0
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel concept est central dans le module Workflow ML ?',jsonb_build_array('A) cible, horizon et baseline','B) La couleur des graphiques','C) Le nom du fichier','D) Le nombre de dossiers'),'A','debutant','Workflow ML','Cible, horizon et baseline structure le travail du module.'),(2,'true_false','Cette pratique est correcte : Une variable disponible après la date de prédiction.',jsonb_build_array('A) Faux','B) Vrai','C) Toujours','D) Seulement en production'),'A','debutant','Workflow ML','Une variable disponible après la date de prédiction est une erreur méthodologique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Workflow ML ?',jsonb_build_array('A) définir cible, horizon, métrique et baseline','B) Optimiser sur le test final','C) Ignorer la baseline','D) Masquer les limites'),'A','intermediaire','Workflow ML','Il faut définir cible, horizon, métrique et baseline.'),(4,'mini_challenge','Quelle affirmation est correcte pour Workflow ML ?',jsonb_build_array('A) La baseline mesure la valeur ajoutée du modèle','B) Le test final guide tous les choix','C) Le score train suffit','D) La causalité est automatique'),'A','avance','Workflow ML','La baseline mesure la valeur ajoutée du modèle.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='machine-learning-python' AND m.order_index=1
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel concept est central dans le module Préparation ?',jsonb_build_array('A) imputation et encodage','B) La couleur des graphiques','C) Le nom du fichier','D) Le nombre de dossiers'),'A','debutant','Préparation','Imputation et encodage structure le travail du module.'),(2,'true_false','Cette pratique est correcte : Ajuster l’imputation sur tout le dataset.',jsonb_build_array('A) Faux','B) Vrai','C) Toujours','D) Seulement en production'),'A','debutant','Préparation','Ajuster l’imputation sur tout le dataset est une erreur méthodologique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Préparation ?',jsonb_build_array('A) apprendre les transformations sur le train','B) Optimiser sur le test final','C) Ignorer la baseline','D) Masquer les limites'),'A','intermediaire','Préparation','Il faut apprendre les transformations sur le train.'),(4,'mini_challenge','Quelle affirmation est correcte pour Préparation ?',jsonb_build_array('A) ColumnTransformer applique des traitements par type de colonne','B) Le test final guide tous les choix','C) Le score train suffit','D) La causalité est automatique'),'A','avance','Préparation','ColumnTransformer applique des traitements par type de colonne.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='machine-learning-python' AND m.order_index=2
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel concept est central dans le module Feature engineering ?',jsonb_build_array('A) variables métier sans fuite','B) La couleur des graphiques','C) Le nom du fichier','D) Le nombre de dossiers'),'A','debutant','Feature engineering','Variables métier sans fuite structure le travail du module.'),(2,'true_false','Cette pratique est correcte : Utiliser des événements futurs.',jsonb_build_array('A) Faux','B) Vrai','C) Toujours','D) Seulement en production'),'A','debutant','Feature engineering','Utiliser des événements futurs est une erreur méthodologique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Feature engineering ?',jsonb_build_array('A) relier chaque feature à une hypothèse métier','B) Optimiser sur le test final','C) Ignorer la baseline','D) Masquer les limites'),'A','intermediaire','Feature engineering','Il faut relier chaque feature à une hypothèse métier.'),(4,'mini_challenge','Quelle affirmation est correcte pour Feature engineering ?',jsonb_build_array('A) La sélection doit être recalculée dans chaque fold','B) Le test final guide tous les choix','C) Le score train suffit','D) La causalité est automatique'),'A','avance','Feature engineering','La sélection doit être recalculée dans chaque fold.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='machine-learning-python' AND m.order_index=3
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel concept est central dans le module Régression ?',jsonb_build_array('A) MAE, RMSE et régularisation','B) La couleur des graphiques','C) Le nom du fichier','D) Le nombre de dossiers'),'A','debutant','Régression','Mae, rmse et régularisation structure le travail du module.'),(2,'true_false','Cette pratique est correcte : Choisir une métrique après le test.',jsonb_build_array('A) Faux','B) Vrai','C) Toujours','D) Seulement en production'),'A','debutant','Régression','Choisir une métrique après le test est une erreur méthodologique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Régression ?',jsonb_build_array('A) comparer DummyRegressor, Ridge et arbre','B) Optimiser sur le test final','C) Ignorer la baseline','D) Masquer les limites'),'A','intermediaire','Régression','Il faut comparer DummyRegressor, Ridge et arbre.'),(4,'mini_challenge','Quelle affirmation est correcte pour Régression ?',jsonb_build_array('A) RMSE pénalise davantage les grosses erreurs','B) Le test final guide tous les choix','C) Le score train suffit','D) La causalité est automatique'),'A','avance','Régression','RMSE pénalise davantage les grosses erreurs.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='machine-learning-python' AND m.order_index=4
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel concept est central dans le module Classification ?',jsonb_build_array('A) probabilités, seuil et rappel','B) La couleur des graphiques','C) Le nom du fichier','D) Le nombre de dossiers'),'A','debutant','Classification','Probabilités, seuil et rappel structure le travail du module.'),(2,'true_false','Cette pratique est correcte : Considérer 0,5 comme seuil toujours optimal.',jsonb_build_array('A) Faux','B) Vrai','C) Toujours','D) Seulement en production'),'A','debutant','Classification','Considérer 0,5 comme seuil toujours optimal est une erreur méthodologique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Classification ?',jsonb_build_array('A) choisir le seuil selon les coûts métier','B) Optimiser sur le test final','C) Ignorer la baseline','D) Masquer les limites'),'A','intermediaire','Classification','Il faut choisir le seuil selon les coûts métier.'),(4,'mini_challenge','Quelle affirmation est correcte pour Classification ?',jsonb_build_array('A) PR-AUC est adaptée aux classes rares','B) Le test final guide tous les choix','C) Le score train suffit','D) La causalité est automatique'),'A','avance','Classification','PR-AUC est adaptée aux classes rares.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='machine-learning-python' AND m.order_index=5
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel concept est central dans le module Ensembles ?',jsonb_build_array('A) arbres, bagging et boosting','B) La couleur des graphiques','C) Le nom du fichier','D) Le nombre de dossiers'),'A','debutant','Ensembles','Arbres, bagging et boosting structure le travail du module.'),(2,'true_false','Cette pratique est correcte : Laisser un arbre croître sans contrainte.',jsonb_build_array('A) Faux','B) Vrai','C) Toujours','D) Seulement en production'),'A','debutant','Ensembles','Laisser un arbre croître sans contrainte est une erreur méthodologique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Ensembles ?',jsonb_build_array('A) comparer les modèles sur le même protocole','B) Optimiser sur le test final','C) Ignorer la baseline','D) Masquer les limites'),'A','intermediaire','Ensembles','Il faut comparer les modèles sur le même protocole.'),(4,'mini_challenge','Quelle affirmation est correcte pour Ensembles ?',jsonb_build_array('A) Random Forest réduit la variance par agrégation','B) Le test final guide tous les choix','C) Le score train suffit','D) La causalité est automatique'),'A','avance','Ensembles','Random Forest réduit la variance par agrégation.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='machine-learning-python' AND m.order_index=6
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel concept est central dans le module Déséquilibre ?',jsonb_build_array('A) pondération et rééchantillonnage','B) La couleur des graphiques','C) Le nom du fichier','D) Le nombre de dossiers'),'A','debutant','Déséquilibre','Pondération et rééchantillonnage structure le travail du module.'),(2,'true_false','Cette pratique est correcte : Suréchantillonner avant le split.',jsonb_build_array('A) Faux','B) Vrai','C) Toujours','D) Seulement en production'),'A','debutant','Déséquilibre','Suréchantillonner avant le split est une erreur méthodologique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Déséquilibre ?',jsonb_build_array('A) appliquer le rééquilibrage dans les folds train','B) Optimiser sur le test final','C) Ignorer la baseline','D) Masquer les limites'),'A','intermediaire','Déséquilibre','Il faut appliquer le rééquilibrage dans les folds train.'),(4,'mini_challenge','Quelle affirmation est correcte pour Déséquilibre ?',jsonb_build_array('A) class_weight modifie le coût des erreurs','B) Le test final guide tous les choix','C) Le score train suffit','D) La causalité est automatique'),'A','avance','Déséquilibre','class_weight modifie le coût des erreurs.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='machine-learning-python' AND m.order_index=7
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel concept est central dans le module Pipelines ?',jsonb_build_array('A) Pipeline et validation croisée','B) La couleur des graphiques','C) Le nom du fichier','D) Le nombre de dossiers'),'A','debutant','Pipelines','Pipeline et validation croisée structure le travail du module.'),(2,'true_false','Cette pratique est correcte : Mélanger un même groupe entre train et validation.',jsonb_build_array('A) Faux','B) Vrai','C) Toujours','D) Seulement en production'),'A','debutant','Pipelines','Mélanger un même groupe entre train et validation est une erreur méthodologique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Pipelines ?',jsonb_build_array('A) choisir le schéma de validation selon les dépendances','B) Optimiser sur le test final','C) Ignorer la baseline','D) Masquer les limites'),'A','intermediaire','Pipelines','Il faut choisir le schéma de validation selon les dépendances.'),(4,'mini_challenge','Quelle affirmation est correcte pour Pipelines ?',jsonb_build_array('A) GroupKFold protège les groupes répétés','B) Le test final guide tous les choix','C) Le score train suffit','D) La causalité est automatique'),'A','avance','Pipelines','GroupKFold protège les groupes répétés.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='machine-learning-python' AND m.order_index=8
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel concept est central dans le module Optimisation ?',jsonb_build_array('A) RandomizedSearchCV et validation imbriquée','B) La couleur des graphiques','C) Le nom du fichier','D) Le nombre de dossiers'),'A','debutant','Optimisation','Randomizedsearchcv et validation imbriquée structure le travail du module.'),(2,'true_false','Cette pratique est correcte : Choisir les hyperparamètres sur le test.',jsonb_build_array('A) Faux','B) Vrai','C) Toujours','D) Seulement en production'),'A','debutant','Optimisation','Choisir les hyperparamètres sur le test est une erreur méthodologique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Optimisation ?',jsonb_build_array('A) séparer tuning et estimation finale','B) Optimiser sur le test final','C) Ignorer la baseline','D) Masquer les limites'),'A','intermediaire','Optimisation','Il faut séparer tuning et estimation finale.'),(4,'mini_challenge','Quelle affirmation est correcte pour Optimisation ?',jsonb_build_array('A) La boucle externe estime la généralisation','B) Le test final guide tous les choix','C) Le score train suffit','D) La causalité est automatique'),'A','avance','Optimisation','La boucle externe estime la généralisation.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='machine-learning-python' AND m.order_index=9
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel concept est central dans le module Interprétabilité ?',jsonb_build_array('A) permutation importance, PDP et SHAP','B) La couleur des graphiques','C) Le nom du fichier','D) Le nombre de dossiers'),'A','debutant','Interprétabilité','Permutation importance, pdp et shap structure le travail du module.'),(2,'true_false','Cette pratique est correcte : Présenter une importance comme causale.',jsonb_build_array('A) Faux','B) Vrai','C) Toujours','D) Seulement en production'),'A','debutant','Interprétabilité','Présenter une importance comme causale est une erreur méthodologique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Interprétabilité ?',jsonb_build_array('A) expliquer globalement et localement avec prudence','B) Optimiser sur le test final','C) Ignorer la baseline','D) Masquer les limites'),'A','intermediaire','Interprétabilité','Il faut expliquer globalement et localement avec prudence.'),(4,'mini_challenge','Quelle affirmation est correcte pour Interprétabilité ?',jsonb_build_array('A) La base value SHAP est la prédiction de référence','B) Le test final guide tous les choix','C) Le score train suffit','D) La causalité est automatique'),'A','avance','Interprétabilité','La base value SHAP est la prédiction de référence.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='machine-learning-python' AND m.order_index=10
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel concept est central dans le module Robustesse ?',jsonb_build_array('A) calibration, sous-groupes et dérive','B) La couleur des graphiques','C) Le nom du fichier','D) Le nombre de dossiers'),'A','debutant','Robustesse','Calibration, sous-groupes et dérive structure le travail du module.'),(2,'true_false','Cette pratique est correcte : Confondre ROC-AUC et calibration.',jsonb_build_array('A) Faux','B) Vrai','C) Toujours','D) Seulement en production'),'A','debutant','Robustesse','Confondre ROC-AUC et calibration est une erreur méthodologique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Robustesse ?',jsonb_build_array('A) mesurer les erreurs par sous-groupe et période','B) Optimiser sur le test final','C) Ignorer la baseline','D) Masquer les limites'),'A','intermediaire','Robustesse','Il faut mesurer les erreurs par sous-groupe et période.'),(4,'mini_challenge','Quelle affirmation est correcte pour Robustesse ?',jsonb_build_array('A) Le Brier score évalue les probabilités','B) Le test final guide tous les choix','C) Le score train suffit','D) La causalité est automatique'),'A','avance','Robustesse','Le Brier score évalue les probabilités.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='machine-learning-python' AND m.order_index=11
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel concept est central dans le module Restitution ?',jsonb_build_array('A) sélection multicritère et model card','B) La couleur des graphiques','C) Le nom du fichier','D) Le nombre de dossiers'),'A','debutant','Restitution','Sélection multicritère et model card structure le travail du module.'),(2,'true_false','Cette pratique est correcte : Choisir uniquement le meilleur score.',jsonb_build_array('A) Faux','B) Vrai','C) Toujours','D) Seulement en production'),'A','debutant','Restitution','Choisir uniquement le meilleur score est une erreur méthodologique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Restitution ?',jsonb_build_array('A) documenter usages, limites et suivi','B) Optimiser sur le test final','C) Ignorer la baseline','D) Masquer les limites'),'A','intermediaire','Restitution','Il faut documenter usages, limites et suivi.'),(4,'mini_challenge','Quelle affirmation est correcte pour Restitution ?',jsonb_build_array('A) La model card formalise les conditions d’usage','B) Le test final guide tous les choix','C) Le score train suffit','D) La causalité est automatique'),'A','avance','Restitution','La model card formalise les conditions d’usage.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='machine-learning-python' AND m.order_index=11
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (101,'qcm','Quelle étape précède le choix du modèle ?',jsonb_build_array('A) Définir cible, horizon, métrique et baseline','B) Une règle aléatoire','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','Définir cible, horizon, métrique et baseline est la réponse attendue.'),(102,'qcm','Quel risque survient si l’imputation utilise tout le dataset ?',jsonb_build_array('A) Fuite de données','B) Une règle aléatoire','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','Fuite de données est la réponse attendue.'),(103,'qcm','Quel composant combine transformations et estimateur ?',jsonb_build_array('A) Pipeline','B) Une règle aléatoire','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','Pipeline est la réponse attendue.'),(104,'qcm','Quelle métrique pénalise fortement les grosses erreurs de régression ?',jsonb_build_array('A) RMSE','B) Une règle aléatoire','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','RMSE est la réponse attendue.'),(105,'qcm','Quelle baseline est adaptée à une classification tabulaire ?',jsonb_build_array('A) DummyClassifier puis régression logistique','B) Une règle aléatoire','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','DummyClassifier puis régression logistique est la réponse attendue.'),(106,'qcm','Quelle méthode réduit la variance d’un arbre ?',jsonb_build_array('A) Random Forest','B) Une règle aléatoire','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','Random Forest est la réponse attendue.'),(107,'qcm','Quel paramètre pondère les classes ?',jsonb_build_array('A) class_weight','B) Une règle aléatoire','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','class_weight est la réponse attendue.'),(108,'qcm','Quel split protège les groupes répétés ?',jsonb_build_array('A) GroupKFold','B) Une règle aléatoire','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','GroupKFold est la réponse attendue.'),(109,'qcm','Quelle méthode estime la performance après tuning ?',jsonb_build_array('A) Validation imbriquée','B) Une règle aléatoire','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','Validation imbriquée est la réponse attendue.'),(110,'qcm','Quelle méthode explique localement une prédiction ?',jsonb_build_array('A) SHAP','B) Une règle aléatoire','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','SHAP est la réponse attendue.'),(111,'qcm','Quel score évalue la qualité probabiliste ?',jsonb_build_array('A) Brier score','B) Une règle aléatoire','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','Brier score est la réponse attendue.'),(112,'qcm','Quel document décrit limites et usages ?',jsonb_build_array('A) Model card','B) Une règle aléatoire','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','Model card est la réponse attendue.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,TRUE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=TRUE;


DO $$
DECLARE quiz_count INT; final_count INT; module_coverage INT; active_count INT; duplicate_orders INT;
BEGIN
 SELECT COUNT(*) FILTER (WHERE q.is_final_test=FALSE),
        COUNT(*) FILTER (WHERE q.is_final_test=TRUE),
        COUNT(DISTINCT m.id),
        COUNT(*) FILTER (WHERE q.is_active)
 INTO quiz_count,final_count,module_coverage,active_count
 FROM public.quiz_questions q
 JOIN public.modules m ON m.id=q.module_id
 JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='machine-learning-python';

 SELECT COUNT(*) INTO duplicate_orders FROM (
   SELECT q.module_id,q.order_index
   FROM public.quiz_questions q
   JOIN public.modules m ON m.id=q.module_id
   JOIN public.courses c ON c.id=m.course_id
   WHERE c.slug='machine-learning-python'
   GROUP BY q.module_id,q.order_index HAVING COUNT(*)>1
 ) d;

 IF quiz_count<>48 OR final_count<>12 OR module_coverage<>12 OR active_count<>0 OR duplicate_orders<>0 THEN
   RAISE EXCEPTION 'Chantier 5 Machine Learning incomplet: quiz %, final %, modules %, actifs %, doublons %',
   quiz_count,final_count,module_coverage,active_count,duplicate_orders;
 END IF;
END $$;
