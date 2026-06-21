# Synchronisation locale après push

Après le push des changements KORYXA Formation, synchroniser un clone local avec :

```bash
git checkout main
git pull origin main
```

Fichiers SQL principaux à récupérer :

```txt
supabase/schema.sql
supabase/migrations/20260621_koryxa_admin_formation_bridge.sql
```

Ne pas rejouer `supabase/schema.sql` sur une base existante sans validation. Pour le pont KORYXA Admin, rejouer uniquement la migration dédiée.
