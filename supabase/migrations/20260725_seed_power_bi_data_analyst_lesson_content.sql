-- KORYXA FORMATION — POWER BI DATA ANALYST — CHANTIER 2
-- Contenu pédagogique complet : 24 leçons, toutes non publiées.

WITH lesson_seed(module_order,lesson_order,slug,title,summary,lesson_type,minutes,objectives,content_md,validation_prompt) AS (
    VALUES
    (0,0,'ecosysteme-power-bi','Comprendre l’écosystème Power BI','Relier Desktop, Service, modèles, rapports et tableaux de bord.','lesson',40,'["Identifier les composants Power BI", "Comprendre le cycle de vie d’un rapport"]'::jsonb,$lesson$# Comprendre l’écosystème Power BI

## Objectif

Relier Desktop, Service, modèles, rapports et tableaux de bord.

## Concepts essentiels

- Power BI Desktop prépare, modélise et conçoit.
- Power BI Service publie, partage, actualise et sécurise.
- Le modèle sémantique porte les données, relations et mesures.

## Démonstration guidée

Importer une table Excel, repérer les vues Rapport, Données et Modèle, puis identifier les objets créés.

## Erreurs à éviter

- Confondre rapport et tableau de bord.
- Construire des visuels avant de vérifier la qualité des données.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quelle différence essentielle existe entre Power BI Desktop et Power BI Service ?'),
    (0,1,'premier-rapport','Créer un premier rapport','Importer une source, créer des visuels et enregistrer un PBIX.','lesson',45,'["Importer une source", "Créer une carte KPI et un graphique", "Enregistrer un rapport"]'::jsonb,$lesson$# Créer un premier rapport

## Objectif

Importer une source, créer des visuels et enregistrer un PBIX.

## Concepts essentiels

- Obtenir les données permet de choisir la source.
- Les champs numériques sont agrégés selon leur type.
- Le fichier PBIX contient modèle, mesures et pages du rapport.

## Démonstration guidée

Importer des ventes, créer une carte de CA et un graphique en barres par région, puis enregistrer le PBIX avec un nom explicite.

## Erreurs à éviter

- Conserver des noms comme Table1.
- Ne pas vérifier l’unité monétaire ou l’agrégation utilisée.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quelles vérifications faut-il effectuer avant de charger une source ?'),
    (1,0,'power-query-types','Nettoyer et typer les données','Utiliser Power Query pour produire une table cohérente.','lesson',50,'["Définir les types", "Nettoyer les colonnes", "Nommer les étapes"]'::jsonb,$lesson$# Nettoyer et typer les données

## Objectif

Utiliser Power Query pour produire une table cohérente.

## Concepts essentiels

- Les types contrôlent calculs, tris et relations.
- Chaque transformation devient une étape rejouable.
- Les noms d’étapes doivent décrire leur rôle métier.

## Démonstration guidée

Promouvoir les en-têtes, convertir DateVente en date, Quantité en entier et Montant en décimal, puis supprimer les colonnes inutiles.

## Erreurs à éviter

- Laisser Power Query deviner tous les types.
- Accumuler des étapes nommées Type modifié 1, 2 et 3.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Pourquoi faut-il définir les types dès le début du nettoyage ?'),
    (1,1,'erreurs-valeurs-nulles','Gérer erreurs et valeurs nulles','Différencier absence de donnée, valeur nulle et erreur de transformation.','lesson',45,'["Identifier les erreurs", "Traiter les valeurs nulles", "Documenter les règles"]'::jsonb,$lesson$# Gérer erreurs et valeurs nulles

## Objectif

Différencier absence de donnée, valeur nulle et erreur de transformation.

## Concepts essentiels

- Une valeur nulle n’est pas toujours équivalente à zéro.
- Une erreur révèle souvent un type ou format incohérent.
- Le traitement dépend du sens métier de la colonne.

## Démonstration guidée

Filtrer les erreurs d’une colonne Prix, inspecter les lignes concernées et créer un indicateur À vérifier pour les prix absents.

## Erreurs à éviter

- Remplacer toutes les valeurs nulles par zéro.
- Supprimer les lignes en erreur sans mesurer l’impact.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Pourquoi remplacer systématiquement les valeurs nulles par zéro est-il risqué ?'),
    (2,0,'combiner-fichiers','Combiner plusieurs fichiers','Consolider des fichiers mensuels avec une transformation unique.','lesson',60,'["Utiliser le connecteur Dossier", "Transformer un fichier exemple", "Contrôler la consolidation"]'::jsonb,$lesson$# Combiner plusieurs fichiers

## Objectif

Consolider des fichiers mensuels avec une transformation unique.

## Concepts essentiels

- Le connecteur Dossier applique les mêmes étapes à chaque fichier.
- Le fichier exemple définit la structure attendue.
- Une colonne FichierSource facilite la traçabilité.

## Démonstration guidée

Combiner quatre CSV mensuels, conserver le nom du fichier source et comparer le nombre de lignes obtenu au total attendu.

## Erreurs à éviter

- Mélanger des fichiers de structures différentes.
- Oublier de filtrer les fichiers temporaires du dossier.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quel contrôle simple permet de vérifier qu’aucun fichier n’a été oublié ?'),
    (2,1,'fusion-jointures','Fusionner des requêtes avec les bonnes jointures','Enrichir une table sans perdre de lignes métier.','lesson',55,'["Choisir une jointure", "Développer les colonnes utiles", "Contrôler les non-correspondances"]'::jsonb,$lesson$# Fusionner des requêtes avec les bonnes jointures

## Objectif

Enrichir une table sans perdre de lignes métier.

## Concepts essentiels

- La jointure gauche conserve toute la table principale.
- La jointure interne ne conserve que les correspondances.
- Une jointure anti gauche identifie les clés inconnues.

## Démonstration guidée

Fusionner Ventes avec Produits par CodeProduit, développer Produit et Catégorie, puis créer une requête anti gauche des codes absents.

## Erreurs à éviter

- Utiliser une jointure interne et perdre des ventes.
- Fusionner sur une clé non unique.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quelle jointure faut-il utiliser pour conserver toutes les ventes ?'),
    (3,0,'faits-dimensions','Identifier faits et dimensions','Organiser les données selon un modèle en étoile.','lesson',50,'["Identifier une table de faits", "Créer des dimensions", "Réduire les répétitions"]'::jsonb,$lesson$# Identifier faits et dimensions

## Objectif

Organiser les données selon un modèle en étoile.

## Concepts essentiels

- La table de faits contient les événements mesurables.
- Les dimensions décrivent les axes d’analyse.
- Les clés relient les faits aux dimensions.

## Démonstration guidée

Séparer une table plate en FaitVentes, DimProduit, DimClient et DimRégion, puis vérifier l’unicité des clés de dimensions.

## Erreurs à éviter

- Placer toutes les colonnes dans une seule table.
- Créer plusieurs tables de faits sans grain défini.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quelle information distingue principalement une table de faits d’une dimension ?'),
    (3,1,'relations-cardinalite','Créer des relations cohérentes','Maîtriser cardinalité, direction du filtre et relations actives.','lesson',55,'["Créer une relation un-à-plusieurs", "Choisir le sens de filtre", "Détecter les ambiguïtés"]'::jsonb,$lesson$# Créer des relations cohérentes

## Objectif

Maîtriser cardinalité, direction du filtre et relations actives.

## Concepts essentiels

- La dimension unique filtre plusieurs lignes de faits.
- Le filtre simple dimension vers fait est le choix standard.
- Une seule relation entre deux chemins doit être active.

## Démonstration guidée

Relier DimProduit[CodeProduit] à FaitVentes[CodeProduit] et tester le filtrage dans une matrice par catégorie.

## Erreurs à éviter

- Activer le filtre bidirectionnel partout.
- Tolérer des doublons dans la clé de dimension.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Pourquoi faut-il éviter les filtres bidirectionnels sans besoin précis ?'),
    (4,0,'table-calendrier','Créer une table calendrier','Construire une dimension Date complète et continue.','lesson',50,'["Créer une table calendrier", "Ajouter les attributs temporels", "Déclarer la table de dates"]'::jsonb,$lesson$# Créer une table calendrier

## Objectif

Construire une dimension Date complète et continue.

## Concepts essentiels

- Une table calendrier couvre toutes les dates de la période.
- Elle rend possibles les fonctions d’intelligence temporelle.
- Sa colonne Date doit être unique et sans trous.

## Démonstration guidée

Créer DimDate avec CALENDAR, ajouter année, trimestre, mois et semaine, puis la marquer comme table de dates.

## Erreurs à éviter

- Utiliser uniquement la colonne DateVente de la table de faits.
- Créer une table calendrier avec des dates manquantes.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Pourquoi une simple colonne de dates dans les ventes ne suffit-elle pas toujours ?'),
    (4,1,'tri-hierarchies-date','Trier et structurer les périodes','Éviter les mois alphabétiques et créer des hiérarchies utiles.','lesson',40,'["Trier les mois", "Créer une hiérarchie", "Préparer l’analyse temporelle"]'::jsonb,$lesson$# Trier et structurer les périodes

## Objectif

Éviter les mois alphabétiques et créer des hiérarchies utiles.

## Concepts essentiels

- NomMois doit être trié par NuméroMois.
- AnnéeMois facilite les axes continus.
- Une hiérarchie permet le drill-down.

## Démonstration guidée

Créer NomMois, NuméroMois et AnnéeMois, appliquer Trier par colonne et construire une hiérarchie Année > Trimestre > Mois.

## Erreurs à éviter

- Trier janvier, février et mars par ordre alphabétique.
- Utiliser une colonne texte ambiguë comme clé de relation.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Comment empêcher Power BI de trier les mois par ordre alphabétique ?'),
    (5,0,'mesures-colonnes','Différencier mesures et colonnes calculées','Choisir le bon type de calcul selon le besoin.','lesson',55,'["Créer une mesure", "Créer une colonne calculée", "Comprendre le contexte"]'::jsonb,$lesson$# Différencier mesures et colonnes calculées

## Objectif

Choisir le bon type de calcul selon le besoin.

## Concepts essentiels

- Une colonne est évaluée ligne par ligne et stockée.
- Une mesure est évaluée selon les filtres du visuel.
- Les KPI doivent généralement être des mesures.

## Démonstration guidée

Créer MargeLigne comme colonne, puis Marge Totale comme mesure et l’afficher par région.

## Erreurs à éviter

- Créer une colonne pour chaque KPI.
- Utiliser une mesure lorsqu’une valeur ligne par ligne est requise.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Dans quel cas faut-il préférer une mesure à une colonne calculée ?'),
    (5,1,'dax-bases-var-divide','Écrire des mesures DAX lisibles','Utiliser SUM, COUNTROWS, DISTINCTCOUNT, DIVIDE et VAR.','lesson',60,'["Créer des mesures de base", "Utiliser DIVIDE", "Structurer avec VAR"]'::jsonb,$lesson$# Écrire des mesures DAX lisibles

## Objectif

Utiliser SUM, COUNTROWS, DISTINCTCOUNT, DIVIDE et VAR.

## Concepts essentiels

- SUM agrège une colonne numérique.
- DISTINCTCOUNT compte les entités uniques.
- DIVIDE gère proprement un dénominateur nul.
- VAR évite la répétition et améliore la lecture.

## Démonstration guidée

Créer CA Total, Nombre Ventes, Clients Actifs, Marge Totale et Taux Marge dans une table Mesures.

## Erreurs à éviter

- Mélanger plusieurs logiques dans une mesure illisible.
- Utiliser / sans gérer la division par zéro.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Pourquoi DIVIDE est-il préférable à l’opérateur / dans certains cas ?'),
    (6,0,'kpi-objectifs','Construire des KPI métier','Formaliser résultats, objectifs et écarts.','lesson',55,'["Créer des KPI", "Comparer à un objectif", "Afficher les écarts"]'::jsonb,$lesson$# Construire des KPI métier

## Objectif

Formaliser résultats, objectifs et écarts.

## Concepts essentiels

- Un KPI combine mesure, cible, période et interprétation.
- L’écart absolu et le taux d’atteinte répondent à des questions différentes.
- Les objectifs peuvent varier par mois et région.

## Démonstration guidée

Relier une table Objectifs au modèle puis créer Écart Objectif et Taux Atteinte.

## Erreurs à éviter

- Utiliser un objectif fixe pour toutes les périodes.
- Colorer un KPI sans expliquer le seuil.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quelles informations transforment un total en véritable KPI ?'),
    (6,1,'calculate-contexte','Modifier le contexte avec CALCULATE','Comprendre comment les filtres influencent les résultats.','lesson',60,'["Utiliser CALCULATE", "Appliquer un filtre métier", "Lire le contexte"]'::jsonb,$lesson$# Modifier le contexte avec CALCULATE

## Objectif

Comprendre comment les filtres influencent les résultats.

## Concepts essentiels

- CALCULATE évalue une expression dans un contexte modifié.
- Les dimensions propagent leurs filtres vers les faits.
- Le même KPI change selon région, produit ou période.

## Démonstration guidée

Créer CA Premium avec CALCULATE, puis une part de CA total et tester les résultats dans une matrice.

## Erreurs à éviter

- Ajouter des filtres sans comprendre leur interaction.
- Attribuer un résultat inattendu à SUM plutôt qu’au contexte.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quel est le rôle principal de CALCULATE ?'),
    (7,0,'comparaisons-temporelles','Comparer les périodes','Créer mois précédent, année précédente et variation.','lesson',60,'["Créer une comparaison mensuelle", "Calculer une variation", "Utiliser DATEADD"]'::jsonb,$lesson$# Comparer les périodes

## Objectif

Créer mois précédent, année précédente et variation.

## Concepts essentiels

- DATEADD déplace le contexte de dates.
- La variation absolue complète la variation en pourcentage.
- Les comparaisons exigent une table calendrier valide.

## Démonstration guidée

Créer CA Mois Précédent, Écart Mensuel et Variation Mensuelle, puis les afficher par mois.

## Erreurs à éviter

- Comparer des périodes incomplètes sans le signaler.
- Utiliser DATEADD sur une colonne de dates non continue.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quel prérequis est indispensable pour utiliser correctement DATEADD ?'),
    (7,1,'cumuls-time-intelligence','Créer des cumuls et analyses annuelles','Utiliser TOTALYTD et SAMEPERIODLASTYEAR.','lesson',55,'["Créer un cumul annuel", "Comparer à l’année précédente", "Tester les filtres"]'::jsonb,$lesson$# Créer des cumuls et analyses annuelles

## Objectif

Utiliser TOTALYTD et SAMEPERIODLASTYEAR.

## Concepts essentiels

- TOTALYTD calcule le cumul depuis le début de l’année.
- SAMEPERIODLASTYEAR retourne la période équivalente précédente.
- Les filtres de région et produit doivent rester actifs.

## Démonstration guidée

Afficher CA Mensuel, CA Cumul Annuel et CA Année Précédente sur une courbe, puis tester plusieurs régions.

## Erreurs à éviter

- Comparer une année complète à une année partielle.
- Créer un cumul en ignorant le contexte de filtre.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quelle différence existe entre CA mensuel et CA cumul annuel ?'),
    (8,0,'choisir-visuels','Choisir des visualisations efficaces','Associer chaque question métier au visuel adapté.','lesson',50,'["Choisir un visuel", "Réduire le bruit", "Créer une hiérarchie"]'::jsonb,$lesson$# Choisir des visualisations efficaces

## Objectif

Associer chaque question métier au visuel adapté.

## Concepts essentiels

- Une courbe montre une évolution.
- Des barres comparent des catégories.
- Une matrice présente un détail structuré.
- Une carte met en avant un KPI.

## Démonstration guidée

Construire une page avec quatre KPI, une courbe mensuelle et un classement des produits.

## Erreurs à éviter

- Utiliser des graphiques 3D.
- Afficher trop de couleurs et de visuels sur une page.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quel visuel convient le mieux pour comparer dix produits ?'),
    (8,1,'segments-drill-tooltip','Créer une analyse interactive','Configurer segments, drill-down, drill-through et info-bulles.','lesson',60,'["Créer des segments", "Configurer le drill-down", "Créer une info-bulle"]'::jsonb,$lesson$# Créer une analyse interactive

## Objectif

Configurer segments, drill-down, drill-through et info-bulles.

## Concepts essentiels

- Les segments filtrent les visuels reliés.
- Le drill-down descend dans une hiérarchie.
- Le drill-through ouvre une page détaillée filtrée.
- Une info-bulle enrichit sans surcharger.

## Démonstration guidée

Créer une page Détail Produit accessible par drill-through et une info-bulle affichant CA, marge et volume.

## Erreurs à éviter

- Créer des interactions différentes sans cohérence.
- Utiliser le drill-through sans bouton de retour.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quelle différence existe entre drill-down et drill-through ?'),
    (9,0,'architecture-rapport','Structurer un rapport multi-pages','Organiser synthèse, analyse et détail dans une navigation claire.','lesson',55,'["Créer une architecture", "Définir une page d’accueil", "Limiter les redondances"]'::jsonb,$lesson$# Structurer un rapport multi-pages

## Objectif

Organiser synthèse, analyse et détail dans une navigation claire.

## Concepts essentiels

- La vue exécutive présente les priorités.
- Les pages analytiques répondent à des questions précises.
- Les boutons et signets créent une navigation cohérente.

## Démonstration guidée

Créer un plan de cinq pages : Accueil, Synthèse, Produits, Régions et Détails, puis ajouter une navigation constante.

## Erreurs à éviter

- Dupliquer les mêmes visuels sur toutes les pages.
- Créer une navigation sans état actif visible.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quel rôle doit jouer la page d’accueil d’un rapport ?'),
    (9,1,'mobile-accessibilite','Préparer mobile et accessibilité','Adapter mise en page, contrastes et navigation.','lesson',50,'["Créer une disposition mobile", "Vérifier les contrastes", "Organiser l’ordre de tabulation"]'::jsonb,$lesson$# Préparer mobile et accessibilité

## Objectif

Adapter mise en page, contrastes et navigation.

## Concepts essentiels

- La disposition téléphone doit prioriser les informations essentielles.
- Les titres et textes alternatifs aident à comprendre les visuels.
- La couleur ne doit pas être le seul vecteur d’information.

## Démonstration guidée

Créer la disposition mobile de la vue exécutive, ajouter des textes alternatifs et vérifier l’ordre de tabulation.

## Erreurs à éviter

- Réduire simplement toute la page desktop.
- Utiliser un contraste faible ou des titres vagues.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quels éléments doivent être prioritaires dans une disposition mobile ?'),
    (10,0,'publication-service','Publier dans Power BI Service','Comprendre espaces de travail, rapports et modèles sémantiques.','lesson',50,'["Publier un rapport", "Utiliser un espace de travail", "Identifier les objets publiés"]'::jsonb,$lesson$# Publier dans Power BI Service

## Objectif

Comprendre espaces de travail, rapports et modèles sémantiques.

## Concepts essentiels

- Publier envoie le rapport et son modèle sémantique.
- L’espace de travail organise collaboration et permissions.
- Une application distribue un contenu stabilisé aux lecteurs.

## Démonstration guidée

Publier un PBIX dans un espace de test, ouvrir le rapport et repérer les paramètres du modèle sémantique.

## Erreurs à éviter

- Publier directement dans un espace de production non testé.
- Confondre permissions du rapport et du workspace.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quels objets principaux sont créés lors de la publication d’un PBIX ?'),
    (10,1,'actualisation-partage','Configurer actualisation et partage','Planifier les mises à jour et choisir les bonnes permissions.','lesson',55,'["Configurer une actualisation", "Comprendre la passerelle", "Partager avec le bon rôle"]'::jsonb,$lesson$# Configurer actualisation et partage

## Objectif

Planifier les mises à jour et choisir les bonnes permissions.

## Concepts essentiels

- Les sources locales nécessitent souvent une passerelle.
- L’actualisation planifiée dépend des informations d’identification de la source.
- Viewer, Contributor, Member et Admin ont des pouvoirs différents.

## Démonstration guidée

Configurer une actualisation de test, documenter la fréquence et valider l’accès d’un utilisateur Viewer.

## Erreurs à éviter

- Partager à des comptes individuels sans gouvernance.
- Exposer des informations d’identification dans la documentation.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quand une passerelle de données est-elle généralement nécessaire ?'),
    (11,0,'rls-securite','Configurer la sécurité RLS','Créer des rôles filtrant les données selon l’utilisateur.','lesson',55,'["Créer un rôle RLS", "Tester un rôle", "Comprendre les limites"]'::jsonb,$lesson$# Configurer la sécurité RLS

## Objectif

Créer des rôles filtrant les données selon l’utilisateur.

## Concepts essentiels

- La RLS limite les lignes visibles.
- Les rôles peuvent être statiques ou dynamiques.
- Les permissions du workspace restent distinctes de la RLS.

## Démonstration guidée

Créer les rôles Nord et Sud, utiliser Afficher comme dans Desktop et vérifier le comportement dans le Service.

## Erreurs à éviter

- Tester la RLS uniquement avec un compte administrateur.
- Supposer que la RLS remplace les permissions de contenu.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quelle différence existe entre permissions d’espace de travail et RLS ?'),
    (11,1,'performance-qualite','Optimiser et documenter le rapport','Réduire le volume, contrôler les mesures et préparer la production.','lesson',60,'["Optimiser le modèle", "Contrôler les performances", "Documenter le rapport"]'::jsonb,$lesson$# Optimiser et documenter le rapport

## Objectif

Réduire le volume, contrôler les mesures et préparer la production.

## Concepts essentiels

- Supprimer les colonnes inutiles réduit la taille.
- Un modèle en étoile simplifie les filtres.
- L’Analyseur de performances identifie les visuels coûteux.
- La documentation décrit sources, mesures, sécurité et actualisation.

## Démonstration guidée

Auditer une page lente, identifier le visuel coûteux, simplifier le modèle puis rédiger une fiche d’exploitation.

## Erreurs à éviter

- Conserver des colonnes à forte cardinalité inutilisées.
- Mettre en production sans contrôler les totaux ni les filtres.

## Résumé opérationnel

Validez le résultat dans un visuel simple, contrôlez les totaux et documentez la logique utilisée.$lesson$,'Quelles vérifications doivent précéder la mise en production ?')
), target AS (
    SELECT m.id AS module_id, m.order_index
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'power-bi-data-analyst'
)
INSERT INTO public.lessons(
    module_id,slug,title,summary,order_index,lesson_type,estimated_minutes,
    objectives,content_md,source_refs,validation_prompt,is_published
)
SELECT t.module_id,l.slug,l.title,l.summary,l.lesson_order,l.lesson_type,l.minutes,
       l.objectives,l.content_md,'["KORYXA Power BI Data Analyst"]'::jsonb,l.validation_prompt,FALSE
FROM lesson_seed l
JOIN target t ON t.order_index = l.module_order
ON CONFLICT (module_id,slug) DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    order_index = EXCLUDED.order_index,
    lesson_type = EXCLUDED.lesson_type,
    estimated_minutes = EXCLUDED.estimated_minutes,
    objectives = EXCLUDED.objectives,
    content_md = EXCLUDED.content_md,
    source_refs = EXCLUDED.source_refs,
    validation_prompt = EXCLUDED.validation_prompt,
    is_published = FALSE;
