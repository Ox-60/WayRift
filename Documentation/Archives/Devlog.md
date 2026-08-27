# Devlog — Journal des décisions

> Historique chronologique des décisions de conception de WayRift.

---

## Session 3 — Août 2026

### Corrections & Précisions

- **Avertissement vie** : seuil abaissé à < 2 cœurs (et non 3)
- **Down/Coma** : déclenchement à vie = 0, sans condition (PvP ET mobs)
- **Guerres** : accessibles aux Nations uniquement. Les Organisations ont des événements organisés par les chefs et les GM — pas de guerres formelles.
- **Portails** : 4 types définis — Instable (se referme après passage), Stable (reste ouvert), Temporel (lore : passé du monde joueur), Faille (créé par un joueur pour accéder à un donjon)
- **Item unique organisation** : vendu aux organisations et nations uniquement. Pas aux joueurs individuels. Système d'achat-revente obligatoire.
- **Skins** : système Tokens — argent réel → tokens (Tebex) OU argent en jeu → tokens (prix élevé). Skins dédiés exclusifs = argent réel uniquement.
- **Renommage** : WayRift (anciennement Waystone MC Serveur). Filiale du studio Any-Way.

### Répartition des revenus (nouveau)

```
Ressource vendue par l'organisation :
  30% → Farmeur (producteur de la ressource)
  25% → Vendeur (qui a passé le contrat)
  45% → Organisation (primes, achats au marché, redistribution)
```

### Progression du farm

Monde minier → Zones d'affluence → Machines (quarries V6)

---

## Session 2 — Juillet 2026

### Ajouts

- FactionModule CDC complet : création, hiérarchie, dissolution, KOTH, impôts
- Claims 2 types : Territoire (Y=40) et Farm (bedrock, resetable 1x/semaine)
- Hiérarchie entités finalisée : Groupe → Organisation (simple/avancée) → Nation
- Réputation joueur 0-100 : 6 paliers, Infâme < 10, Suspect 10-19
- Vote réputation via paiement impôts de faction
- Lore fondateur officiel : explorateurs du multivers, portail instable, monolithe
- Arc narratif V1→V7 formalisé

### Simplifications

- Agonie 3min → effet visuel < 2 cœurs + Down state ReviveMe
- Matrice droits 4 profils → 2 états membre/non-membre
- KOTH accord des chefs → GM lance chaque manche
- HDV Steam Market custom → AuctionHouse configuré
- Pot de taxe physique → commande `/f pay`

### Plugins confirmés

Vulcan, CustomNameplates, OxyTowns, ProAntiTab, LibsDisguises, AdvancedBanX, AntiXray, Axiom, AxMines, BetonQuest, Citizens, CoreProtect, EssentialsX, FastAsyncWorldEdit, Grimac, ItemsAdder, LuckPerms, Multiverse-Core, PlaceholderAPI, PlasmoVoice, ProtocolLib, SkinsRestorer, TAB, Tebex, Vault, WorldGuard

---

## Session 1 — Juin 2026

### Concept initial

- Serveur Minecraft Semi-RP Multivers inspiré Civilisation
- Paper 1.21, plugins uniquement (pas de mods)
- OVH Game anti-DDoS

### Premières décisions

- Monnaie unique globale (Oboles ¢)
- Portails physiques interconnectés (Multiverse-Core Nether Portals)
- Monde minier = passé du monde joueur (lore narratif)
- Monde minier accessible 20h-23h, Jour 0 : 24h/24 pendant 48h
- Régénération terrain hors claim chaque mardi 10h
- Capitale : hub 24h/24 avec HDV, portails, hôpital, marché, Bas-Fonds (V3+)

### Abandonné en session 1

- Pierre de voyage consommable → portails physiques
- Système politique formel (Monarchie, République...) → liberté totale aux joueurs

---

*WayRift — V3 — Confidentiel*
