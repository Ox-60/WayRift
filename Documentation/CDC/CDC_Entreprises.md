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

```
CONTRAT FACTION -> FACTION (constructeur) :
  1. Vendeur contacte une faction ou nation (pas un joueur individuel)
     (permission requise : vendre-items-crafts)
  2. Contrat établi : quantité OU prix (l'un s'adapte à l'autre)
     + faction destinataire définie
  3. Vendeur récupère les items du coffre selon la quantité du contrat
  4. Vendeur livre physiquement à l'acheteur
  5. Acheteur valide la livraison -> paiement déclenché automatiquement
     (permission requise acheteur : acheter-passer-commande-compte-groupe)
     (l'argent est débité du compte de GROUPE, pas du joueur individuel)
  6. Vendeur reçoit 25% du montant de la vente

CONTRAT FACTION -> INDIVIDUEL (orgas/nations NON-constructrices) :
  Les organisations et nations qui ne sont pas constructrices peuvent
  revendre les items achetés aux joueurs individuels.
  Prix minimum : prix constructeur + 25%
  Le contrat peut être passé avec une faction OU un individuel.
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

| Paramètre | Description |
|---|---|
| Prix constructeur min/max | Fourchette dans laquelle le chef peut fixer le prix constructeur |
| Pourcentage crafteur min/max | Fourchette dans laquelle le chef peut fixer la part du crafteur (défaut 30%) |
| Prix vendeur min/max | Fourchette dans laquelle le chef peut fixer les prix de vente |
| Majoration non-constructeur | Pourcentage minimum que les orgas/nations non-constructrices doivent appliquer au-dessus du prix constructeur (défaut +25%) |

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

## Points ouverts

| # | Point | Priorité |
|---|---|---|
| 1 | Interface logs — GUI ou commande ? | Haute |
| 2 | Limite nombre de contrats actifs simultanés | Moyenne |
| 3 | Que se passe-t-il si le vendeur ne livre pas ? Délai d'expiration du contrat ? | Haute |
| 4 | Les items non activés peuvent-ils être échangés entre joueurs ? | Moyenne |
| 5 | Coffre de faction = bloc physique ou interface virtuelle ? | Haute |

---

*WayRift — V3 — Confidentiel*
