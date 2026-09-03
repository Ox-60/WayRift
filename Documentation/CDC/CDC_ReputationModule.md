# CDC — ReputationModule

## Principes fondamentaux

- La réputation bouge **lentement** — conçue pour évoluer sur des semaines, pas des jours
- Les deux extrêmes (Légendaire et Infâme) sont des **choix de gameplay conscients**
- Les factions Infâmes **veulent rester en bas** — c'est une identité choisie, pas une punition
- La réputation reflète le comportement global du joueur, pas uniquement le PvP

---

## Échelle — 0 à 1200

| Score | Label | Nameplate | Accès | Restriction |
|---|---|---|---|---|
| 1000-1200 | Légendaire | Couronne | Zones VIP Capitale, chasseur éligible (event Traque) | — |
| 750-999 | Honorable | Vert clair | — | — |
| 500-749 | Neutre | Gris | — | — |
| 200-499 | Neutre bas | Gris foncé | — | — |
| 100-199 | Suspect | Orange | — | Interdit HDV officiel (seuil HDV = 200, exclut Infâme ET Suspect) |
| 0-99 | **Infâme** | Rouge + tête de mort | Bas-Fonds (V3) | Interdit HDV officiel |

> Départ à **500** pour tous les nouveaux joueurs. Valeur neutre : 500.

---

## Limites hebdomadaires — Règle centrale

| Limite | Valeur | Portée |
|---|---|---|
| Points cumulés par semaine (±) | **±150** | Toutes sources sauf modération |
| Malus PvP max/semaine | **-50** | Via Downs uniquement |
| Inactivité max total | **-200** | Retour vers 500 progressif |
| Micro-actions quotidiennes | **+10/jour max** | Potions, animaux, cultures, pêche combinés |

> Les malus de modération (warn/mute/ban) sont **hors limite hebdomadaire**.

---

## Actions et effets

### Actions positives

| Action | Effet | Limite |
|---|---|---|
| Vote positif reçu | +3 pts | Max 2 votes consécutifs par même votant |
| Payer ses impôts à temps | +3 pts | Par paiement effectué |
| Revive d'un joueur Down | +4 pts | — |
| Don public à la Capitale | +6 pts | Max 1 fois/semaine — montant minimum : 1 000¢ |
| Créer des potions positives | +1 pt | Max +5 pts/jour |
| Nourrir des animaux | +1 pt | Max 3 fois/jour (1 fois/2h) |
| Planter et récolter des cultures | +1 pt | Max 3 fois/jour |
| Pêcher | +1 pt | Max 3 fois/jour — métier Pêcheur requis (V3+) |
| Participer à un contrat entreprise | +5 pts | Max 1 fois/jour |
| Acheter une parcelle en Capitale | +5 pts | Par achat (V3+) |
| Voter pour le serveur (top-serveurs) | +1 vote à distribuer (+/-) | 2 fois/jour — dure 1h |
| Event bienveillant GM | +1 à +15 pts directs aux participants | GM configure la valeur |
| Participation event GM (choix joueur) | 1 à 15 pts à distribuer soi-même | GM attribue les votes |
| Victoire de guerre (Nations) | +15 pts permanent + 15 pts temporaire | Tend vers l'extrémité actuelle |

### Actions négatives

| Action | Effet | Limite |
|---|---|---|
| Vote négatif reçu | -2 pts | Max 2 votes consécutifs par même votant |
| Down infligé hors guerre | -2 pts | Max -50 pts/semaine via cette source |
| Attaquer hors guerre/nation ennemie sans Down | -1 pt | Max 3 fois/jour |
| Voler dans un claim | -3 pts | Uniquement si le voleur a réputation > 300. Détecté via CoreProtect. |
| Racket sur joueur Down (1 slot) | -3 pts | Uniquement si racketteur > 300 ET victime > 300 |
| Racket via inspection (1 slot) | -3 pts | Uniquement si racketteur > 300 ET victime > 300 |
| Défaite de guerre (Nations) | -10 pts | Tend vers l'extrémité actuelle |
| Event malveillant GM | -2 à -6 pts directs | Infâmes et mafias uniquement |
| Warn de modération | -50 pts | Tend vers 500 — hors limite hebdo |
| Mute de modération | -100 pts | Tend vers 500 — hors limite hebdo |
| Ban temporaire | -200 pts | Tend vers 500 — hors limite hebdo |

### Sans effet sur la réputation

| Action | Raison |
|---|---|
| Wipe d'un joueur | Neutre volontaire |
| Inactivité | Retour progressif vers 500 (pas un malus, une neutralisation) |

---

## Comportement passif — Inactivité

**Déclenchement : 7 jours consécutifs avec moins de 20% de connexions uniques dans la semaine** (règle générale d'inactivité, applicable à ce contexte).

Un joueur inactif voit sa réputation revenir **progressivement vers 500** :
- Si réputation > 500 : descend vers 500 (max -200 pts total)
- Si réputation < 500 : monte vers 500 (max +200 pts total)
- S'arrête exactement à 500

> L'inactivité neutralise les extrêmes. Elle ne punit pas.

---

## Comportement modération — Tend vers 500

Les sanctions tendent **toujours vers 500**, quel que soit le camp :

```
Joueur à 200 pts (Neutre bas) reçoit un ban (-200 pts vers 500)
  -> Il gagne +200 pts et arrive à 400 pts (Neutre bas)

Joueur à 1000 pts (Légendaire) reçoit un ban (-200 pts vers 500)
  -> Il perd -500 pts et arrive à 500 pts (Neutre)
```

> La modération neutralise les extrêmes dans les deux sens.

---

## Comportement guerre — Tend vers l'extrémité actuelle

```
Héros (1000 pts) gagne une guerre : +15 permanent +15 temporaire -> monte vers 1200
Infâme (50 pts) gagne une guerre : -15 permanent -15 temporaire -> descend vers 0
```

> La guerre renforce l'identité du camp.

---

## Vol & Racket — Mécaniques criminelles

Le malus s'applique **uniquement si le voleur/racketteur a une réputation > 300**. En dessous de 300 : vol et racket sans malus de réputation.

```
Voleur/Racketteur > 300 pts -> malus de réputation appliqué
Voleur/Racketteur < 300 pts -> aucun malus (les Infâmes opèrent librement)
```

### Vol dans un claim
- -3 pts pour le voleur (si réputation > 300)
- Aucun lien avec la réputation de la victime

### Racket — 2 mécaniques

**1. Racket sur joueur Down** — le racketteur prend 1 slot. -3 pts si racketteur > 300 ET victime > 300.

**2. Racket via inspection (joueur debout)** — Conditions physiques : SPYGLASS en main, cible dos à l'inspecteur, 2 blocs max, mains vides. 75% de l'inventaire révélé aléatoirement (quantités non affichées). La cible peut accepter (1 slot pris) ou refuser (risque de se faire mettre en Down).

---

## Factions Infâmes — Logique de gameplay

Les factions Infâmes choisissent délibérément de rester en dessous de 100. Ce n'est pas un état subi. Leurs avantages croissent à mesure qu'elles descendent :

- Accès au Bas-Fonds et marché noir (V3)
- Events malveillants GM réservés (-2 à -6 pts → descendent encore plus)
- Vol et racket sans malus entre joueurs < 300 pts
- Avantages économiques exclusifs en échange de l'absence d'accès à l'HDV officiel

> Les micro-actions positives (potions, cultures, animaux) ont un plafond journalier de +10 pts combinés — même en les faisant toutes, une faction infâme active ne remonte pas malgré elle.

---

## Votes de réputation — Détail

- Un même joueur peut voter pour la même personne **maximum 2 fois de suite**
- Vote via impôts : payer ses impôts génère 1 vote à distribuer
- Vote via top-serveur : 2 fois/jour, dure 1h avant expiration. **Compte dans la limite hebdomadaire de ±150 pts.**
- Vote positif ou négatif : au choix du votant

---

## Trajectoires types

| Profil | Points/semaine | Départ → Légendaire | Départ → Infâme |
|---|---|---|---|
| Actif bienveillant | +150 (limite) | ~4 semaines | — |
| Modéré bienveillant | +80 | ~6-7 semaines (S6-S7) | — |
| Modéré mafia | -80 | — | ~5 semaines (S5) |
| Actif mafia | -150 (limite) | — | ~3 semaines |

---

## Urgence event GM — Remontée rapide

Un joueur Infâme (< 100 pts) peut gagner jusqu'à +100 pts en 1 semaine en faisant des actions positives intensives (limite hebdo = 150, marge disponible). Cela lui permet de repasser au-dessus du seuil Infâme (100) pour éviter une mort RP potentielle lors d'un event de Traque. Voir CDC_Events_GM.md.

---

## Tokens & Prestige

| Paramètre | Valeur |
|---|---|
| Prix token en jeu | 500¢ |
| Prix token Tebex | 5€ pour 100 tokens |
| Prix lootbox | 100 tokens (5€) |
| Tokens pour 1 wipe prestige | 250 tokens |
| Coût prestige en Tebex | ~12.50€ |
| Coût prestige en farm actif | ~3.4 semaines |
| Coût prestige en farm modéré | ~8 semaines |
| Tokens gardés à la mort | Oui |
| Usage tokens | Wipe prestige (250 tokens) **+ achat de parcelles housing** |
| Points de prestige gardés à la mort | Oui |

### Conditions de wipe prestige

```
OPTION 1 — Wipe volontaire :
  -> 250 tokens accumulés
  -> Niveau de compte : 10 / 20 / 30 / 40 / 50 puis tous les 5
  -> Wipe complet du personnage (XP compte et achats Tebex conservés)

OPTION 2 — Mort RP :
  -> Le joueur en fait la demande
  -> Le GM valide et orchestre la scène
  -> Wipe complet du personnage (XP compte et achats Tebex conservés)

Récompense : +1 point de prestige permanent
```

---

## Intégration technique

- **ReputationPlugin** + **LuckPerms** + **CustomNameplates**
- Seuils → rangs LuckPerms automatiques → CustomNameplates adapte le nameplate
- Détection vol → hook CoreProtect → malus automatique
- Logs de toutes les variations avec source, valeur, date

---

## Commandes

| Commande | Description | Permission |
|---|---|---|
| `/reputation info [joueur]` | Affiche réputation, label, historique récent | joueur |
| `/reputation top` | Classement des joueurs | joueur |
| `/reputation vote <joueur> up/down` | Utilise un vote disponible | joueur (si votes disponibles) |
| `/reputation set <uuid> <valeur>` | Définit la réputation directement | admin |
| `/reputation add <uuid> <valeur> <raison>` | Ajoute/retire des points avec log | admin/GM |
| `/reputation history <uuid>` | Historique complet des variations | admin/GM |
| `/reputation reload` | Recharge la configuration | admin |

---

## Configuration

| Variable | Valeur | Type | Description |
|---|---|---|---|
| `reputation.scale-max` | 1200 | Int | Maximum de l'échelle |
| `reputation.neutral-value` | 500 | Int | Valeur neutre / départ (modération et inactivité tendent vers ici) |
| `reputation.infame-threshold` | 100 | Int | Seuil Infâme (< 100) |
| `reputation.suspect-threshold` | 200 | Int | Seuil Suspect (< 200) |
| `reputation.honorable-threshold` | 750 | Int | Seuil Honorable (>= 750) |
| `reputation.legendary-threshold` | 1000 | Int | Seuil Légendaire (>= 1000) |
| `reputation.weekly-change-limit` | 150 | Int | Points max modifiés/semaine cumulés |
| `reputation.weekly-pvp-malus-limit` | 50 | Int | Malus max/semaine via Downs |
| `reputation.inactivity-max-total` | 200 | Int | Points max perdus/gagnés via inactivité |
| `reputation.daily-micro-actions-limit` | 10 | Int | Points max/jour via micro-actions combinées |
| `reputation.vote-max-consecutive` | 2 | Int | Votes consécutifs max par même votant |
| `reputation.server-vote-duration-minutes` | 60 | Int | Durée vote top-serveur avant expiration |
| `reputation.server-vote-per-day` | 2 | Int | Votes top-serveur max par jour |
| `reputation.down-penalty` | 2 | Int | Malus par Down infligé hors guerre |
| `reputation.attack-penalty` | 1 | Int | Malus par attaque sans Down hors guerre |
| `reputation.attack-daily-limit` | 3 | Int | Limite journalière attaques sans Down |
| `reputation.steal-penalty` | 3 | Int | Malus par vol dans un claim (si voleur > 300) |
| `reputation.steal-threshold` | 300 | Int | Seuil réputation au-dessus duquel le vol/racket est puni |
| `reputation.racket-penalty` | 3 | Int | Malus par racket (si racketteur > 300 ET victime > 300) |
| `reputation.revive-bonus` | 4 | Int | Bonus par revive effectué |
| `reputation.donation-bonus` | 6 | Int | Bonus don public Capitale (1x/semaine) |
| `reputation.donation-min-amount` | 1000 | Int | Montant minimum du don public (¢) |
| `reputation.tax-payment-bonus` | 3 | Int | Bonus paiement impôts |
| `reputation.contract-bonus` | 5 | Int | Bonus contrat entreprise (1x/jour) |
| `reputation.plot-purchase-bonus` | 5 | Int | Bonus achat parcelle Capitale |
| `reputation.war-victory-permanent` | 15 | Int | Bonus permanent victoire guerre |
| `reputation.war-victory-temporary` | 15 | Int | Bonus temporaire victoire guerre |
| `reputation.war-defeat-malus` | 10 | Int | Malus défaite guerre |
| `reputation.warn-malus` | 50 | Int | Malus warn (vers 500) |
| `reputation.mute-malus` | 100 | Int | Malus mute (vers 500) |
| `reputation.ban-malus` | 200 | Int | Malus ban temporaire (vers 500) |

---

## Points ouverts

| # | Point | Priorité |
|---|---|---|
| 1 | Avantages Infâmes détaillés (Bas-Fonds, marché noir) | V3 |

---

*WayRift — V3 — Confidentiel*
