# Roadmap V1 — Juillet 2025

## Plugins confirmés

| Plugin | Rôle | Priorité |
|---|---|---|
| Vulcan 2.9.7.23 | AntiCheat secondaire | 🔴 Critique |
| CustomNameplates 3.0.39 | Nameplates RP. Tête de mort Infâme. | 🔴 Critique |
| OxyTowns 1.1.0 | Claims — 1 seul type | 🔴 Critique |
| ProAntiTab 2.3.4 | Masque joueurs dans le Tab | 🟠 Haute |
| LibsDisguises 11.0.18 | Déguisements GM | 🟠 Haute |
| AdvancedBanX 3.1.0 | Warns, mutes, bans | 🔴 Critique |
| AntiXray 3.0 | Masquage blocs côté client | 🔴 Critique |
| AxInventoryRestore 3.13.0 | Restauration inventaire staff (urgences) | 🟡 Moyenne |
| Axiom 5.4.2 | Éditeur monde Architectes | 🟠 Haute |
| AxMines 1.7.0 | Zones farm régénérables monde minier | 🟠 Haute |
| BetonQuest | Scripts événements, dialogues PNJ | 🟠 Haute |
| Citizens 2.0.42 | PNJ interactifs | 🟠 Haute |
| CoreProtect-CE 23.2 | Anti-grief, logs, rollback | 🔴 Critique |
| EssentialsX 2.22.1 + Chat/Discord/Link | Commandes staff + chat + Discord | 🔴 Critique |
| FastAsyncWorldEdit 2.15.3 | Terraforming admin | 🟠 Haute |
| Grimac 2.3.74 | AntiCheat principal | 🔴 Critique |
| ItemsAdder 4.0.17 | Items custom | 🟠 Haute |
| LuckPerms 5.5.55 | Rangs et permissions — central à tout | 🔴 Critique |
| Multiverse-Core 5.7.0 | Mondes + portails Nether | 🔴 Critique |
| PlaceholderAPI 2.12.2 | Variables dynamiques | 🔴 Critique |
| PlasmoVoice | Proximity voice | 🔴 Critique |
| ProtocolLib | Packets réseau / GUI | 🔴 Critique |
| SkinsRestorer | Skins custom | 🟠 Haute |
| TAB 6.0.3 | Nametags, tablist, prénoms RP | 🟠 Haute |
| Tebex 2.4.2 | Boutique en ligne | 🟠 Haute |
| Vault | API économique | 🔴 Critique |
| WorldGuard 7.0.17 | Zones protégées | 🔴 Critique |

---

## Plugins à valider pour V1

| Plugin | Besoin | Statut |
|---|---|---|
| ReviveMe | Down state, revive collègue, hôpital, effet visuel | ⏳ À confirmer |
| SaberFactions ou ImprovedFactions | Base groupes/factions, hiérarchie, diplomatie | ⏳ À confirmer |
| ReputationPlugin | Réputation 0-100, seuils, PlaceholderAPI | ⏳ À confirmer |
| AuctionHouse | HDV avec liste blanche items | ⏳ À confirmer |
| ChestProtect | Protection coffres individuelle (max 2/joueur) | ⏳ À confirmer |

---

## Ce qui est custom obligatoire

| Élément | Pourquoi | Complexité |
|---|---|---|
| Identité RP (nom unique) | Levenshtein, serment, combinaison prénom+nom unique | Moyenne |
| Wipe joueur | Suppression sélective connexions plugins sauf compte et achats | Légère |
| Regen monde joueur hors claim | FAWE + API OxyTowns pour chunks libres vs claimés | Légère |
| Hooks FactionModule | Validation GM, dissolution calendrier, KOTH score | Légère |
| Vote réputation via impôts | Hook FactionModule -> ReputationPlugin | Légère |

---

*WayRift — V3 — Confidentiel*
