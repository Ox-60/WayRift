# CDC — Système Entreprises & Coffre de Faction

## Types d'entreprises

| Type | Icône | Clients cibles |
|---|---|---|
| Construction | ⚒️ | Joueurs et factions — bâtiments sur commande |
| Ingénieurs | 💡 | Joueurs et factions — systèmes redstone complexes (Mécanicien requis) |
| Terraform | ⛏️ | Joueurs et factions — gros travaux de terrain |
| Journalisme | 📰 | Staff et factions — comptes rendus, interviews, cinématiques |
| **Production** | 🏭 | **Constructeurs : B2B uniquement. Autres orgas/nations : joueurs autorisés.** |
| Vente | 🛒 | Joueurs et factions — boissons, consommables |

---

## Activation des items

Les items craftés par les producteurs sont **non activés** à leur sortie.
Ils deviennent **actifs** dans deux cas :
- Lorsqu'ils sont **achetés via un contrat** (livraison validée par l'acheteur)
- Lorsqu'ils sont **retirés du coffre par un Responsable** pour distribution interne au groupe

> L'activation est nécessaire pour les items à utilisation : consommables, items avec effets, etc.

---

## Permissions du coffre de faction

| Permission | Rôle | Ce qu'elle autorise |
|---|---|---|
| `acceder-coffre-faction` | Tous les rôles concernés | Ouvrir le coffre de faction |
| `crafter-items-custom` | Crafteur | Déposer uniquement les items custom dans le coffre. Aucun autre bloc autorisé. |
| `vendre-items-crafts` | Vendeur | Retirer uniquement les items custom du coffre pour répondre aux contrats |
| `responsable` (si autorisé par le chef) | Responsable | Accès coffre selon autorisation du chef. Peut retirer des items pour les activer et les distribuer en interne. |
| `magasinier` | Magasinier | Déposer ET retirer n'importe quel bloc du coffre |

> Le chef définit quels responsables ont accès au coffre.

---

## Flux de production — Craft & Dépôt

```
1. Crafteur farm des ressources + applique la recette
   -> Obtient un item custom NON ACTIVÉ

2. Crafteur dépose l'item dans le coffre de faction
   (permission : crafter-items-custom — dépôt uniquement, pas de retrait)
   (aucun autre bloc autorisé dans le coffre par le crafteur)

3. Paiement automatique au crafteur :
   -> 30% du prix constructeur par item déposé
   -> Pourcentage paramétrable par le chef (entre min et max défini par les admins)

LOG généré :
  "[date&heure] [pseudo] a crafté X items [item] et a reçu X¢"
```

---

## Flux de vente — Contrat B2B

### Prix de vente B2B

**Fourchette : 125% à 150% du prix constructeur.** Le vendeur négocie le prix exact dans cette fourchette selon le contrat.

```
CONTRAT FACTION -> FACTION (constructeur) :
  1. Vendeur contacte une faction ou nation (pas un joueur individuel)
     (permission requise : vendre-items-crafts)
  2. Contrat établi : quantité + prix (entre 125% et 150% du prix constructeur)
     + faction destinataire définie
  3. Vendeur récupère les items du coffre selon la quantité du contrat
  4. Vendeur livre physiquement à l'acheteur
  5. Acheteur valide la livraison -> paiement déclenché automatiquement
     (permission requise acheteur : acheter-passer-commande-compte-groupe)
     (l'argent est débité du compte de GROUPE, pas du joueur individuel)

CONTRAT FACTION -> INDIVIDUEL (orgas/nations NON-constructrices) :
  Les organisations et nations qui ne sont pas constructrices peuvent
  revendre les items achetés aux joueurs individuels.
  Prix minimum : prix constructeur + 25% (identique à la fourchette B2B)
  Le contrat peut être passé avec une faction OU un individuel.
```

### Répartition de l'argent — Qui reçoit quoi, et quand

```
AU DÉPÔT (instantané, avant toute vente) :
  -> Le crafteur reçoit 30% du PRIX CONSTRUCTEUR (référence fixe)
     par item, immédiatement à chaque dépôt en coffre
  -> Ce paiement ne dépend pas du prix de vente final — il est garanti

À LA VENTE (au moment de la transaction validée) :
  -> Le vendeur reçoit 25% du PRIX CONSTRUCTEUR (référence fixe),
     directement à la validation de la vente
  -> La faction reçoit TOUT LE RESTE du prix de vente réel
     (prix de vente réel [125-150% constructeur] moins les 30% + 25%
     déjà versés au crafteur et au vendeur)
     -> Cet argent sert plus tard à financer la fabrication future

EXEMPLE (prix constructeur = 20¢, vendu à 150% = 30¢) :
  Crafteur  : 30% x 20¢ = 6¢ (versé au dépôt)
  Vendeur   : 25% x 20¢ = 5¢ (versé à la vente)
  Faction   : 30¢ - 6¢ - 5¢ = 19¢ (le reste du prix de vente réel)

  -> Vendre au prix maximum (150%) profite directement à la faction,
     puisque crafteur et vendeur touchent un montant fixe peu importe
     le prix de vente final.
```

---

## Logs du coffre de faction

Chaque action sur le coffre génère un log horodaté :

### Logs coffre (items)

```
[date&heure] [pseudo] a déposé X [item] dans le coffre
[date&heure] [pseudo] a retiré X [item] du coffre
```

### Logs craft & paiement crafteur

```
[date&heure] [pseudo] a crafté X [item] et a reçu X¢
```

### Logs contrats & transactions

```
[date&heure] Contrat passé par [acheteur pseudo] :
             achat de X [item] pour X¢ de la faction [vendeur]

[date&heure] [vendeur pseudo] a retiré X [item] du coffre
             (contrat #ID avec [faction acheteur])

[date&heure] [acheteur pseudo] a ajouté X [item] dans le coffre
             (livraison validée — contrat #ID)

[date&heure] [vendeur pseudo] a reçu X¢ (25% de la vente — contrat #ID)
```

---

## Paramétrage admin (global)

| Paramètre | Valeur |
|---|---|
| Prix constructeur — fourchette | 16¢ à 22¢/unité |
| Prix vendeur — fourchette | 24¢ à 32¢/unité |
| Pourcentage crafteur min/max | Fourchette dans laquelle le chef peut fixer la part du crafteur (défaut 30%) |
| Fourchette prix B2B | 125% à 150% du prix constructeur |
| Majoration non-constructeur | +25% minimum au-dessus du prix constructeur (revente aux individuels) |

> Le chef fixe son prix constructeur dans la fourchette 16-22¢, et son prix vendeur dans la fourchette 24-32¢. Ces fourchettes donnent une marge de négociation tout en gardant un contrôle global admin.

## Paramétrage chef d'organisation

| Paramètre | Description |
|---|---|
| Pourcentage crafteur | Entre le min et max global (défaut 30%) |
| Prix constructeur | Dans la fourchette admin |
| Attribution des permissions | Chef définit qui a accès au coffre parmi les responsables |

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
| `/e setrole <joueur> <rôle>` | Définit le rôle | chef |
| `/e stock` | Ouvre le coffre de faction (selon permissions) | selon permission |
| `/e logs` | Affiche les logs du coffre et des contrats | chef/responsable |
| `/e contrat create <entité> <quantité> <prix>` | Crée un contrat | vendeur |
| `/e contrat list` | Liste les contrats actifs | chef/vendeur |
| `/e contrat validate <id>` | Valide la livraison et déclenche le paiement | acheteur |
| `/e contrat cancel <id>` | Annule un contrat | chef/vendeur |

---

## Coffre de faction — interactions physiques

Le coffre de faction est un **bloc physique** qui donne accès à une interface virtuelle.

| Interaction | Action | Permission requise |
|---|---|---|
| **Clic gauche** | Dépose les items custom directement (sans ouvrir l'interface) | `crafter-items-custom` uniquement — pas besoin de `acceder-coffre-faction` |
| **Clic droit** | Ouvre l'interface complète du coffre | `acceder-coffre-faction` |

> Le clic gauche facilite le dépôt pour les crafteurs : ils n'ont pas besoin de voir le contenu du coffre, juste de déposer. Ils n'ont pas besoin de la permission d'ouverture du coffre.

---

## Items non activés — règles

- Les items non activés **ne peuvent pas être échangés entre joueurs**
- Le crafteur **ne peut pas les dropper**
- Ils sont **obligatoirement amenés dans le coffre de faction** pour être déposés

---

## Contrats — expiration

- Si le vendeur ne livre pas, l'acheteur ne valide pas
- Le contrat expire automatiquement à la fin du délai d'expiration
- À expiration : contrat annulé, aucune transaction effectuée

---

## Points ouverts

| # | Point | Priorité |
|---|---|---|
| 1 | Délai d'expiration des contrats (valeur à définir) | Haute |
| 2 | Limite nombre de contrats actifs simultanés | Moyenne |
| 3 | Interface logs — GUI ou commande `/e logs` ? | Haute |

---

*WayRift — V3 — Confidentiel*

---

## Note — Progression des métiers (V2+)

La progression dans un métier se fait **naturellement par la pratique** :
- Miner → monte le niveau Mineur
- Pêcher → monte le niveau Pêcheur
- Forger → monte le niveau Forgeron
- Soigner → monte le niveau Médecin
- etc.

Pas de système de points ou d'XP à dépenser — le niveau reflète l'activité réelle du joueur. Plugin : AdvancedJobs + AdvancedSkills (V2).

---

*WayRift — V3 — Confidentiel*
