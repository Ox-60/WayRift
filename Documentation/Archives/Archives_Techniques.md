# Archives Techniques — Mécaniques abandonnées

> Ce document conserve les mécaniques qui ont été simplifiées ou remplacées lors de la conception. Référence historique — peut servir de base pour des versions futures.

---

## Agonie 3 minutes (remplacée)

**Remplacée par :** effet visuel < 2 cœurs + Down state à 0 HP sans condition

**Mécanique originale :**
- PvP uniquement (mobs exclus)
- +10 HP, Slowness III, Blindness I, sprint désactivé
- Durée : 3 minutes
- 1/3 de chance de rétablissement seul au bout de 3 min
- Sinon : faim + froid 30s → Coma
- Re-touché avant 3 min → Coma immédiat

**Raison du remplacement :** Trop complexe à développer. ReviveMe couvre le besoin nativement de façon plus simple. La distinction PvP/mobs était une contrainte inutile.

---

## Matrice des droits 4 profils (simplifiée)

**Remplacée par :** 2 états membre/non-membre + guerre GM

**Mécanique originale :**

| Profil | Claim protégé | Claim ineffectif |
|---|---|---|
| Habitant (même faction) | Survie complète | Survie complète |
| Habitant ennemi (guerre GM) | Pas de pose/casse sauf exceptions GM | Survie complète — casse et pose libre |
| Visiteur neutre | Pas de pose/casse | Pas de pose/casse |
| Visiteur ennemi (guerre GM) | Pas de pose/casse | Survie complète — casse et pose libre |

**Raison :** OxyTowns gère nativement les droits membre/non-membre. La complexité supplémentaire n'apportait pas de valeur suffisante.

---

## KOTH avec accord des chefs multi-semaines (simplifié)

**Remplacé par :** GM lance chaque manche avec une commande. Nations uniquement.

**Mécanique originale :**
- Accord des deux chefs requis (15 min pour valider)
- 15 min de préparation avant lancement
- Heure limite de début définissable
- Manches sur plusieurs semaines, pas de limite de temps
- 3-0 ou 3-1 → manche spéciale automatique

**Raison :** Aucune automatisation nécessaire. Le GM orchestre tout. Plus de contrôle narratif.

---

## HDV Steam Market custom (simplifié)

**Remplacé par :** AuctionHouse configuré avec liste blanche

**Mécanique originale :**
- Graphique de prix médians (semaine/mois/existence) généré dynamiquement
- Achat du moins cher en premier avec récapitulatif par palier
- Affichage "Vous recevrez" vs "Prix sur le marché" (frais inclus)
- Ordres d'achat (buy orders) — finalement non retenu

**Raison :** Trop complexe pour V1. Reporté en V2 quand le serveur a des données de marché suffisantes.

---

## Pot de taxe physique (simplifié)

**Remplacé par :** Commande `/f pay` simple

**Mécanique originale :**
- Bloc physique placé par le chef (`/f settaxpot`)
- Protection de zone cylindrique autour du pot (rayon configurable)
- Paiement en cliquant physiquement sur le bloc
- Logs de tous les paiements

**Raison :** Reporté en V2 comme élément RP. La commande simple suffit pour V1.

---

## Pierre de voyage consommable (remplacée)

**Remplacée par :** Portails physiques interconnectés

**Mécanique originale :**
- Item consommable par destination
- Achetable en Capitale
- Téléportation directe sans portail physique

**Raison :** Les portails physiques sont plus immersifs et cohérents avec le lore.

---

## Système politique formel (abandonné)

**Abandonné**

**Mécanique envisagée :**
- Monarchie, Empire, République, Théocratie...
- Chaque type donnait des bonus/malus définis
- Vote interne selon le type politique choisi

**Raison :** Pas de valeur ajoutée concrète. Trop rigide. Les joueurs définissent leur organisation librement.

---

## Coma spectateur ancré 9 chunks (remplacé)

**Remplacé par :** Down state mobile ReviveMe

**Mécanique originale :**
- Mode spectateur Minecraft ancré
- Rayon max : 9 chunks autour du point de mort
- Impossible de s'éloigner au-delà du rayon

**Raison :** Comportement natif ReviveMe plus simple et suffisant.

---

*WayRift — V3 — Archives — Confidentiel*
