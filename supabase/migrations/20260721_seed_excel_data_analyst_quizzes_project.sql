-- KORYXA FORMATION — EXCEL DATA ANALYST — CHANTIER 4
-- Quiz, test final et projet fil rouge. Contenus non publiés.

ALTER TABLE public.quiz_questions
    ADD COLUMN IF NOT EXISTS question_type TEXT NOT NULL DEFAULT 'qcm'
        CHECK (question_type IN ('qcm','true_false','comprehension','mini_challenge')),
    ADD COLUMN IF NOT EXISTS is_final_test BOOLEAN NOT NULL DEFAULT FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='excel-data-analyst' AND m.order_index=0
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
    (1,'qcm','Quelle structure convient à une base d’analyse ?',jsonb_build_array('A) Une ligne par observation','B) Plusieurs titres par colonne','C) Des cellules fusionnées dans la base','D) Des sous-totaux entre les lignes'),'A','structure','Une base exploitable contient une ligne par observation et une colonne par variable.'),(2,'true_false','La référence $A$1 reste fixe lorsqu’une formule est recopiée.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement en ligne','D) Seulement dans un TCD'),'A','références','Les symboles dollar verrouillent colonne et ligne.'),(3,'comprehension','Pourquoi séparer Données, Calculs et Synthèse ?',jsonb_build_array('A) Pour rendre le classeur lisible et contrôlable','B) Pour augmenter sa taille','C) Pour supprimer les formules','D) Pour désactiver les filtres'),'A','organisation','La séparation clarifie les responsabilités de chaque feuille.'),(4,'mini_challenge','Un taux en H2 doit rester fixe. Quelle référence utiliser ?',jsonb_build_array('A) H2','B) $H$2','C) H$2 seulement','D) $H2 seulement'),'B','références absolues','$H$2 verrouille la colonne et la ligne.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,answer=EXCLUDED.answer,
 difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='excel-data-analyst' AND m.order_index=1
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
    (1,'qcm','Quelle formule calcule une marge ?',jsonb_build_array('A) CA-Coût','B) CA+Coût','C) CA/0','D) Quantité-Produit'),'A','formules','La marge est le chiffre d’affaires diminué du coût.'),(2,'true_false','SIERREUR doit masquer toutes les erreurs sans contrôle.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement en production','D) Seulement avec Power Query'),'B','erreurs','Une erreur peut signaler un problème de données à corriger.'),(3,'comprehension','Que fait ET dans une condition ?',jsonb_build_array('A) Toutes les conditions doivent être vraies','B) Une seule suffit','C) Il additionne','D) Il trie'),'A','logique','ET retourne vrai uniquement si toutes les conditions le sont.'),(4,'mini_challenge','Objectif atteint si CA>=700000. Quelle fonction convient ?',jsonb_build_array('A) SI','B) GAUCHE','C) INDEX','D) UNIQUE'),'A','condition','SI traduit directement cette règle métier.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,answer=EXCLUDED.answer,
 difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='excel-data-analyst' AND m.order_index=2
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
    (1,'qcm','Quel avantage apporte un tableau structuré ?',jsonb_build_array('A) Extension automatique des formules','B) Suppression des en-têtes','C) Blocage des filtres','D) Conversion des dates en texte'),'A','tableaux','Les tableaux étendent formules, formats et plages.'),(2,'true_false','Deux clients portant le même nom sont forcément des doublons.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement avec RECHERCHEX','D) Seulement en CSV'),'B','qualité','Il faut une clé métier fiable avant de supprimer des doublons.'),(3,'comprehension','À quoi sert la validation des données ?',jsonb_build_array('A) Limiter les valeurs autorisées','B) Créer un graphique','C) Chiffrer le fichier','D) Remplacer Power Query'),'A','validation','La validation réduit les variantes et erreurs de saisie.'),(4,'mini_challenge','Nord, nord et NORD coexistent. Première correction ?',jsonb_build_array('A) Normaliser la catégorie','B) Créer trois régions','C) Fusionner les cellules','D) Ajouter un graphique'),'A','normalisation','Une catégorie doit être représentée de manière cohérente.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,answer=EXCLUDED.answer,
 difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='excel-data-analyst' AND m.order_index=3
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
    (1,'qcm','Quel argument de RECHERCHEX indique le résultat en cas d’absence ?',jsonb_build_array('A) si_non_trouvé','B) largeur','C) format','D) couleur'),'A','RECHERCHEX','Cet argument rend les anomalies explicites.'),(2,'true_false','RECHERCHEX peut retourner une colonne située à gauche de la clé.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement avec VBA','D) Seulement sur Mac'),'A','recherche','RECHERCHEX n’impose pas la direction de RECHERCHEV.'),(3,'comprehension','Quel rôle joue EQUIV ?',jsonb_build_array('A) Trouver une position','B) Additionner une plage','C) Créer un segment','D) Protéger une feuille'),'A','INDEX EQUIV','EQUIV renvoie la position utilisée ensuite par INDEX.'),(4,'mini_challenge','Un code P999 n’existe pas. Que faut-il afficher ?',jsonb_build_array('A) Une anomalie explicite','B) Un prix inventé','C) Toujours zéro sans message','D) Le supprimer silencieusement'),'A','contrôle','Une absence de correspondance doit être visible et traitée.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,answer=EXCLUDED.answer,
 difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='excel-data-analyst' AND m.order_index=4
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
    (1,'qcm','Quelle fonction retire les espaces inutiles ?',jsonb_build_array('A) SUPPRESPACE','B) SOMME','C) EQUIV','D) AUJOURDHUI'),'A','texte','SUPPRESPACE normalise les espaces superflus.'),(2,'true_false','Une date Excel valide est stockée comme un nombre.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement en anglais','D) Seulement dans Power Pivot'),'A','dates','Le format affiche une date mais la valeur sous-jacente est numérique.'),(3,'comprehension','Comment tester qu’une date est bien reconnue ?',jsonb_build_array('A) ESTNUM','B) CONCAT','C) NB.SI','D) FILTRE'),'A','dates','ESTNUM confirme que la valeur est numérique.'),(4,'mini_challenge','Quel calcul mesure un délai en jours ?',jsonb_build_array('A) Date_fin-Date_début','B) Date_fin+Texte','C) SOMME des noms','D) GAUCHE(Date)'),'A','délais','La différence entre deux dates retourne un nombre de jours.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,answer=EXCLUDED.answer,
 difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='excel-data-analyst' AND m.order_index=5
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
    (1,'qcm','Dans SOMME.SI.ENS, quelle plage vient en premier ?',jsonb_build_array('A) La plage à additionner','B) Le titre','C) La couleur','D) Le filtre du graphique'),'A','SOMME.SI.ENS','La syntaxe commence par la plage de somme.'),(2,'true_false','Un total devient un KPI sans objectif ni période.',jsonb_build_array('A) Vrai','B) Faux','C) Toujours','D) Seulement dans un dashboard'),'B','KPI','Un KPI possède contexte, cible et interprétation.'),(3,'comprehension','Comment calculer le panier moyen ?',jsonb_build_array('A) CA/Nombre de ventes','B) CA+Nombre de ventes','C) Marge-Date','D) Produit*Région'),'A','KPI','Le panier moyen rapporte le chiffre d’affaires au volume de ventes.'),(4,'mini_challenge','Aucune vente ne correspond au filtre. Que protéger ?',jsonb_build_array('A) La division du panier moyen','B) Le titre','C) Le segment','D) Le nom du fichier'),'A','erreurs','La division par zéro doit être gérée explicitement.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,answer=EXCLUDED.answer,
 difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='excel-data-analyst' AND m.order_index=6
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
    (1,'qcm','Quelle zone d’un TCD contient les mesures agrégées ?',jsonb_build_array('A) Valeurs','B) Couleurs','C) Commentaires','D) Protection'),'A','TCD','La zone Valeurs contient les sommes, nombres ou moyennes.'),(2,'true_false','Une source sous forme de tableau facilite l’actualisation du TCD.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement en PDF','D) Seulement avec macros'),'A','actualisation','Le tableau s’étend automatiquement avec les nouvelles lignes.'),(3,'comprehension','À quoi sert une chronologie ?',jsonb_build_array('A) Filtrer les dates','B) Calculer une marge','C) Nettoyer du texte','D) Écrire du DAX'),'A','chronologie','La chronologie filtre facilement année, trimestre, mois ou jour.'),(4,'mini_challenge','CA apparaît comme Nombre. Première vérification ?',jsonb_build_array('A) Le type numérique de la source','B) La couleur du segment','C) Le titre du fichier','D) Le zoom'),'A','agrégation','Des nombres stockés comme texte provoquent souvent cette agrégation.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,answer=EXCLUDED.answer,
 difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='excel-data-analyst' AND m.order_index=7
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
    (1,'qcm','Quel graphique montre une évolution temporelle ?',jsonb_build_array('A) Une courbe','B) Un secteur 3D','C) Une image','D) Une zone de texte'),'A','visualisation','La courbe permet de suivre une évolution dans le temps.'),(2,'true_false','Un axe tronqué est acceptable pour comparer des barres sans explication.',jsonb_build_array('A) Vrai','B) Faux','C) Toujours','D) Seulement en impression'),'B','intégrité visuelle','Les barres doivent généralement partir de zéro pour éviter les écarts trompeurs.'),(3,'comprehension','Pourquoi utiliser un titre déclaratif ?',jsonb_build_array('A) Il communique la conclusion','B) Il cache les données','C) Il remplace la source','D) Il augmente le fichier'),'A','storytelling','Le titre déclaratif annonce le message principal.'),(4,'mini_challenge','Comparer dix produits. Quel choix est lisible ?',jsonb_build_array('A) Barres horizontales triées','B) Camembert 3D','C) Dix jauges','D) Nuage sans labels'),'A','comparaison','Les barres horizontales facilitent la lecture des catégories.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,answer=EXCLUDED.answer,
 difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='excel-data-analyst' AND m.order_index=8
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
    (1,'qcm','Quel connecteur consolide des fichiers mensuels identiques ?',jsonb_build_array('A) Dossier','B) Webcam','C) Presse-papiers','D) Graphique'),'A','Power Query','Le connecteur Dossier applique les mêmes transformations aux fichiers.'),(2,'true_false','Les étapes Power Query sont rejouées lors de l’actualisation.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement une fois','D) Seulement avec VBA'),'A','actualisation','Power Query rejoue la chaîne de transformation.'),(3,'comprehension','Pourquoi renommer les étapes ?',jsonb_build_array('A) Pour documenter la transformation','B) Pour supprimer les données','C) Pour changer Excel','D) Pour cacher les erreurs'),'A','documentation','Des noms explicites facilitent maintenance et audit.'),(4,'mini_challenge','Garder toutes les ventes malgré des produits absents. Quelle jointure ?',jsonb_build_array('A) Gauche','B) Interne uniquement','C) Anti droite','D) Cartésienne'),'A','jointure','La jointure gauche conserve toutes les lignes de la table principale.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,answer=EXCLUDED.answer,
 difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='excel-data-analyst' AND m.order_index=9
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
    (1,'qcm','Que contient une table de faits ?',jsonb_build_array('A) Les événements mesurables','B) Uniquement des couleurs','C) Des macros','D) Des images'),'A','modèle','La table de faits contient transactions et mesures.'),(2,'true_false','La clé d’une dimension doit être unique.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement en CSV','D) Seulement pour les dates'),'A','relations','L’unicité garantit une relation un-à-plusieurs cohérente.'),(3,'comprehension','Quelle différence entre mesure et colonne calculée ?',jsonb_build_array('A) La mesure dépend du contexte de filtre','B) Aucune','C) La mesure est toujours du texte','D) La colonne n’a pas de lignes'),'A','DAX','Une mesure est évaluée selon le contexte du rapport.'),(4,'mini_challenge','Quel DAX protège une division ?',jsonb_build_array('A) DIVIDE','B) LEFT','C) CONCAT','D) COUNTIF'),'A','DAX','DIVIDE gère proprement le dénominateur nul.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,answer=EXCLUDED.answer,
 difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='excel-data-analyst' AND m.order_index=10
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
    (1,'qcm','Combien de KPI principaux faut-il généralement afficher en haut ?',jsonb_build_array('A) Trois à cinq','B) Vingt-cinq','C) Aucun','D) Cinquante'),'A','dashboard','Un petit nombre d’indicateurs prioritaires améliore la lecture.'),(2,'true_false','Chaque graphique doit répondre à une question métier.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement en finance','D) Seulement sur mobile'),'A','design','Un bloc sans question métier ajoute du bruit.'),(3,'comprehension','Que doit vérifier un test utilisateur ?',jsonb_build_array('A) Que les réponses sont trouvables sans explication orale','B) La couleur préférée du développeur','C) Le nombre de feuilles uniquement','D) La vitesse de frappe'),'A','UX','Le dashboard doit permettre de répondre rapidement aux questions prévues.'),(4,'mini_challenge','Un segment ne filtre qu’un graphique sur trois. Que vérifier ?',jsonb_build_array('A) Les connexions de rapport','B) Le mot de passe','C) La police','D) La taille du fichier'),'A','interactivité','Les connexions déterminent les TCD contrôlés par le segment.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,answer=EXCLUDED.answer,
 difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='excel-data-analyst' AND m.order_index=11
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
    (1,'qcm','Quelle feuille documente l’utilisation du classeur ?',jsonb_build_array('A) Lisez-moi','B) Brouillon caché','C) Macro inconnue','D) Corbeille'),'A','documentation','Une feuille Lisez-moi décrit sources, actualisation et limites.'),(2,'true_false','La protection de feuille remplace une sécurité informatique complète.',jsonb_build_array('A) Vrai','B) Faux','C) Toujours','D) Seulement avec mot de passe'),'B','protection','Elle évite surtout les modifications accidentelles.'),(3,'comprehension','Quand préférer Power Query à une macro ?',jsonb_build_array('A) Pour importer et transformer des données reproductiblement','B) Pour changer une couleur une fois','C) Pour imprimer','D) Pour écrire un titre'),'A','automatisation','Power Query est adapté aux pipelines de préparation actualisables.'),(4,'mini_challenge','Une formule diffère au milieu d’une colonne. Que faire ?',jsonb_build_array('A) L’auditer comme anomalie','B) L’ignorer','C) Supprimer la colonne','D) Protéger sans vérifier'),'A','contrôle qualité','Une incohérence de formule peut fausser tout le rapport.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,answer=EXCLUDED.answer,
 difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='excel-data-analyst' AND m.order_index=11
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES (101,'qcm','Quelle fonction moderne remplace souvent RECHERCHEV ?',jsonb_build_array('A) RECHERCHEX','B) SOMME','C) GAUCHE','D) FILTRE'),'A','recherche','RECHERCHEX est plus flexible et gère directement les absences.'),(102,'qcm','Quel outil consolide plusieurs CSV mensuels ?',jsonb_build_array('A) Power Query','B) WordArt','C) Mise en forme conditionnelle','D) Commentaires'),'A','Power Query','Power Query automatise import et transformation.'),(103,'qcm','Quel modèle sépare faits et dimensions ?',jsonb_build_array('A) Modèle en étoile','B) Liste plate avec sous-totaux','C) Organigramme','D) Graphique 3D'),'A','modélisation','Le modèle en étoile organise les axes d’analyse autour des faits.'),(104,'qcm','Quelle mesure calcule correctement un taux ?',jsonb_build_array('A) DIVIDE([Marge],[CA])','B) LEFT([CA])','C) CONCAT([Marge])','D) COUNTROWS sans contexte'),'A','DAX','DIVIDE gère proprement les dénominateurs nuls.'),(105,'qcm','Quel graphique montre une tendance mensuelle ?',jsonb_build_array('A) Courbe','B) Secteur 3D','C) Image','D) Carte de texte'),'A','visualisation','Une courbe est adaptée aux séries temporelles.'),(106,'qcm','Que faut-il faire avant de supprimer des doublons ?',jsonb_build_array('A) Définir la clé d’unicité','B) Trier par couleur','C) Fusionner les cellules','D) Masquer les lignes'),'A','qualité','La clé évite de supprimer de vrais enregistrements.'),(107,'qcm','Quel élément transforme une mesure en KPI ?',jsonb_build_array('A) Objectif, période et interprétation','B) Une couleur vive','C) Une macro','D) Une image'),'A','KPI','Un KPI est contextualisé et orienté décision.'),(108,'qcm','Que contrôle un segment ?',jsonb_build_array('A) Les TCD connectés','B) Les mots de passe','C) Les fichiers CSV externes uniquement','D) Le format des dates'),'A','interactivité','Le segment filtre les tableaux croisés reliés.'),(109,'qcm','Quel document accompagne un fichier professionnel ?',jsonb_build_array('A) Une feuille Lisez-moi','B) Aucun','C) Une capture seule','D) Un mot de passe public'),'A','documentation','La documentation rend le fichier compréhensible et maintenable.'),(110,'qcm','Quelle protection est prioritaire avant partage ?',jsonb_build_array('A) Contrôler erreurs et verrouiller les zones sensibles','B) Ajouter de la 3D','C) Cacher toutes les feuilles','D) Supprimer les sources'),'A','contrôle qualité','Le fichier doit être fiabilisé avant diffusion.'),(111,'qcm','Quel livrable prouve la compétence finale ?',jsonb_build_array('A) Un dashboard actualisable avec analyse','B) Une feuille vide','C) Un titre','D) Une liste de fonctions sans données'),'A','projet final','Le livrable doit fonctionner et répondre à des questions métier.'),(112,'qcm','Le projet final peut-il rester dépendant d’étapes manuelles non documentées ?',jsonb_build_array('A) Non','B) Oui','C) Toujours','D) Seulement si le fichier est grand'),'A','reproductibilité','Les étapes d’actualisation doivent être décrites et reproductibles.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,'intermediaire',s.skill,s.explanation,FALSE,TRUE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET question_type=EXCLUDED.question_type,question=EXCLUDED.question,
 options=EXCLUDED.options,answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=TRUE;

WITH c AS (SELECT id FROM public.courses WHERE slug='excel-data-analyst')
INSERT INTO public.course_projects(
 course_id,slug,title,summary,brief_md,corpus_policy_md,starter_assets,minimum_version,
 advanced_version,functional_criteria,technical_criteria,rubric,reference_solution_md,is_published
)
SELECT c.id,'dashboard-analyse-commerciale','Dashboard d’analyse commerciale avec Excel',
'Construire un classeur professionnel qui consolide quatre mois de ventes, automatise le nettoyage, modélise les données et présente des recommandations métier.',
'# Brief\n\nVous intervenez comme analyste pour une entreprise qui reçoit chaque mois des fichiers de ventes. Votre mission est de construire un classeur actualisable permettant à la direction de suivre chiffre d’affaires, marge, volume, produits, régions et commerciaux.\n\n## Questions métier\n- Comment évoluent les ventes ?\n- Quels produits et régions contribuent le plus ?\n- Où la marge se dégrade-t-elle ?\n- Quelles actions recommander ?\n\n## Livrables\n- classeur Excel final ;\n- requêtes Power Query ;\n- modèle de données ;\n- mesures ;\n- dashboard interactif ;\n- feuille Lisez-moi ;\n- analyse écrite et recommandations.',
'# Politique des données\n\nUtiliser uniquement les fichiers fournis par la formation ou des données autorisées. Ne pas intégrer de données personnelles sensibles. Documenter toute modification apportée aux sources.',
'[{"path":"/resources/excel-data-analyst/04_power_query_modele_dashboard.xlsx","purpose":"Classeur de départ"},{"path":"/resources/excel-data-analyst/ventes_2026_01.csv","purpose":"Données janvier"},{"path":"/resources/excel-data-analyst/ventes_2026_02.csv","purpose":"Données février"},{"path":"/resources/excel-data-analyst/ventes_2026_03.csv","purpose":"Données mars"},{"path":"/resources/excel-data-analyst/ventes_2026_04.csv","purpose":"Données avril"}]'::jsonb,
'["Consolider les 4 CSV","Nettoyer et typer les données","Fusionner les référentiels","Créer CA et Marge","Construire le modèle en étoile","Créer au moins 4 KPI","Créer un dashboard filtrable","Rédiger 3 recommandations"]'::jsonb,
'["Ajouter une table calendrier complète","Créer des comparaisons mensuelles","Ajouter des contrôles qualité automatiques","Créer une version imprimable","Documenter une procédure d’actualisation en un clic"]'::jsonb,
'["Les quatre mois sont consolidés","Les KPI réagissent aux filtres","Les graphiques répondent aux questions métier","Les recommandations sont fondées sur les résultats","Le fichier est utilisable sans explication orale"]'::jsonb,
'["Requêtes Power Query nommées","Relations sans ambiguïté","Mesures centralisées","Aucune erreur visible","Sources et actualisation documentées","Zones sensibles protégées"]'::jsonb,
'[{"criterion":"Préparation et qualité des données","points":12},{"criterion":"Modèle et calculs","points":12},{"criterion":"KPI et exactitude","points":10},{"criterion":"Dashboard et interactivité","points":10},{"criterion":"Analyse et recommandations","points":8},{"criterion":"Documentation et contrôle qualité","points":8}]'::jsonb,
'# Solution de référence\n\nLa solution attendue utilise Power Query pour consolider les fichiers, un modèle en étoile avec dimensions Date, Produit et Région, des mesures centralisées pour CA, Marge et Taux de marge, puis un dashboard limité aux indicateurs utiles. La solution détaillée reste séparée de l’espace apprenant jusqu’à l’évaluation.',FALSE
FROM c
ON CONFLICT(course_id,slug) DO UPDATE SET
 title=EXCLUDED.title,summary=EXCLUDED.summary,brief_md=EXCLUDED.brief_md,corpus_policy_md=EXCLUDED.corpus_policy_md,
 starter_assets=EXCLUDED.starter_assets,minimum_version=EXCLUDED.minimum_version,advanced_version=EXCLUDED.advanced_version,
 functional_criteria=EXCLUDED.functional_criteria,technical_criteria=EXCLUDED.technical_criteria,rubric=EXCLUDED.rubric,
 reference_solution_md=EXCLUDED.reference_solution_md,is_published=FALSE;

WITH p AS (
 SELECT cp.id AS project_id,cp.course_id FROM public.course_projects cp JOIN public.courses c ON c.id=cp.course_id
 WHERE c.slug='excel-data-analyst' AND cp.slug='dashboard-analyse-commerciale'
), seed(module_order,slug,title,description,deliverables,acceptance,ord) AS (VALUES
(2,'donnees-propres','Préparer une base propre','Structurer les données et contrôler types, doublons et catégories.','["Base structurée","Règles de qualité"]'::jsonb,'["Une ligne par vente","Aucun doublon injustifié","Types cohérents"]'::jsonb,0),
(5,'kpi','Définir les KPI','Formaliser les indicateurs, objectifs et formules.','["Dictionnaire KPI","Calculs contrôlés"]'::jsonb,'["Au moins quatre KPI","Chaque formule est justifiée"]'::jsonb,1),
(6,'analyse-croisee','Construire l’analyse croisée','Créer les premiers TCD et filtres.','["TCD régions-produits","Segments"]'::jsonb,'["Sommes correctes","Filtres fonctionnels"]'::jsonb,2),
(8,'pipeline-power-query','Automatiser la préparation','Consolider les quatre CSV et enrichir les ventes.','["Requêtes Power Query","Table consolidée"]'::jsonb,'["48 lignes importées","Actualisation reproductible","Aucune jointure silencieusement perdue"]'::jsonb,3),
(9,'modele-donnees','Construire le modèle','Créer dimensions, relations et mesures.','["Modèle en étoile","Mesures DAX"]'::jsonb,'["Relations un-à-plusieurs","Aucune ambiguïté","Mesures exactes"]'::jsonb,4),
(10,'dashboard','Assembler le dashboard','Créer une synthèse interactive et lisible.','["Dashboard final","Filtres interactifs"]'::jsonb,'["Quatre KPI","Tendance mensuelle","Comparaison produits et régions","Lecture sur un écran"]'::jsonb,5),
(11,'recette-remise','Auditer et remettre','Tester, protéger, documenter et rédiger les recommandations.','["Classeur final","Feuille Lisez-moi","Analyse et recommandations"]'::jsonb,'["Aucune erreur bloquante","Actualisation documentée","Trois recommandations fondées sur les données"]'::jsonb,6)
)
INSERT INTO public.course_project_milestones(project_id,module_id,slug,title,description,deliverables,acceptance_criteria,order_index,is_published)
SELECT p.project_id,m.id,s.slug,s.title,s.description,s.deliverables,s.acceptance,s.ord,FALSE
FROM p JOIN public.modules m ON m.course_id=p.course_id JOIN seed s ON s.module_order=m.order_index
ON CONFLICT(project_id,slug) DO UPDATE SET module_id=EXCLUDED.module_id,title=EXCLUDED.title,description=EXCLUDED.description,
 deliverables=EXCLUDED.deliverables,acceptance_criteria=EXCLUDED.acceptance_criteria,order_index=EXCLUDED.order_index,is_published=FALSE;

DO $$
DECLARE quiz_count INT; final_count INT; project_count INT; milestone_count INT; rubric_total INT;
BEGIN
 SELECT COUNT(*) INTO quiz_count FROM public.quiz_questions q JOIN public.modules m ON m.id=q.module_id JOIN public.courses c ON c.id=m.course_id WHERE c.slug='excel-data-analyst' AND q.is_final_test=FALSE;
 SELECT COUNT(*) INTO final_count FROM public.quiz_questions q JOIN public.modules m ON m.id=q.module_id JOIN public.courses c ON c.id=m.course_id WHERE c.slug='excel-data-analyst' AND q.is_final_test=TRUE;
 SELECT COUNT(*) INTO project_count FROM public.course_projects cp JOIN public.courses c ON c.id=cp.course_id WHERE c.slug='excel-data-analyst';
 SELECT COUNT(*) INTO milestone_count FROM public.course_project_milestones pm JOIN public.course_projects cp ON cp.id=pm.project_id JOIN public.courses c ON c.id=cp.course_id WHERE c.slug='excel-data-analyst';
 SELECT COALESCE(SUM((item->>'points')::INT),0) INTO rubric_total FROM public.course_projects cp JOIN public.courses c ON c.id=cp.course_id, LATERAL jsonb_array_elements(cp.rubric) item WHERE c.slug='excel-data-analyst';
 IF quiz_count<>48 OR final_count<>12 OR project_count<>1 OR milestone_count<>7 OR rubric_total<>60 THEN
   RAISE EXCEPTION 'Chantier 4 Excel incomplet: quiz %, final %, projets %, jalons %, barème %',quiz_count,final_count,project_count,milestone_count,rubric_total;
 END IF;
END $$;
