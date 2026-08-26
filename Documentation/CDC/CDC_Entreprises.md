# CDC — Système Entreprises

## Types d'entreprises

| Type | Icône | Clients cibles |
|---|---|---|
| Construction | ⚒️ | Joueurs et factions — bâtiments sur commande |
| Ingénieurs | 💡 | Joueurs et factions — systèmes redstone complexes (Mécanicien requis) |
| Terraform | ⛏️ | Joueurs et factions — gros travaux de terrain |
| Journalisme | 📰 | Staff et factions — comptes rendus, interviews, cinématiques |
| **Production** | 🏭 | **Groupes, organisations, nations UNIQUEMENT — vente B2B** |
| Vente | 🛒 | Joueurs et factions — boissons, consommables |

---

## Entreprise de Production — Règle fondamentale

> ⚠️ Une entreprise de production ne peut **JAMAIS** vendre directement à un joueur individuel.

### Rôles internes

```
Producteur : dépose les items dans le coffre de production
             ne peut PAS retirer des items du coffre

Vendeur    : retire les items pour livrer au client
             ne peut PAS déposer dans le coffre
             limité à être vendeur d'UNE SEULE organisation

Owner      : gère les permissions, les rôles, le QG
```

### Flux de contrat

```
1. Le VENDEUR contacte un acheteur (groupe, organisation ou nation)
2. L'ACHETEUR signe le contrat avec le vendeur
3. Le vendeur reçoit une MISSION :
   -> Récupérer dans le coffre les items vendus
   -> Livrer physiquement à l'acheteur
4. Livraison effectuée -> contrat terminé
   -> Montant débité automatiquement
   -> Prix : 75% à 125% du prix constructeur
```

---

## Commandes

| Commande | Description | Permission |
|---|---|---|
| `/e` | Affiche le menu d'entreprise | joueur |
| `/e list` | Liste toutes les entreprises | joueur |
| `/e <nom>` | Ouvre l'interface d'une entreprise | joueur |
| `/e create` | Crée une entreprise | joueur |
| `/e invite <joueur> <nom>` | Invite un joueur | chef |
| `/e join <nom>` | Rejoint une entreprise | joueur |
| `/e leave <nom>` | Quitte une entreprise | membre |
| `/e disband <nom>` | Supprime définitivement (double confirmation) | chef |
| `/e setqg` | Définit la position du QG | chef |
| `/e kick <joueur>` | Exclure un joueur | chef |
| `/e setrole <joueur> <rôle>` | Définit le rôle (producteur/vendeur/acheteur) | chef |
| `/e stock` | Ouvre l'interface du coffre de production | producteur/vendeur |
| `/e contrat create <entité> <montant>` | Crée un contrat de vente | vendeur |
| `/e contrat list` | Liste les contrats actifs | chef/vendeur |
| `/e contrat complete <id>` | Marque un contrat comme livré | vendeur |

---

## Points ouverts

| # | Point | Priorité |
|---|---|---|
| 1 | Salaires internes | Faible — plugin dédié non officiel, laissé de côté |
| 2 | Limite d'entreprises par joueur | Moyenne |
| 3 | Coût de création d'une entreprise | Moyenne |
| 4 | Validation staff pour création | Moyenne |
| 5 | Interface contrats (GUI ou commande) | Haute |
| 6 | Coffre de production — ChestProtect compatible ? | Haute |

---

*WayRift — V3 — Confidentiel*
