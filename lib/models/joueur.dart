class Joueur {
  final String? id;
  final String nom;
  final String poste;
  final int age;
  final String categorie;
  final double? taille;
  final int matchsJoues;
  final int buts;
  final int passesDecisives;
  final int cartonsJaunes;
  final int cartonsRouges;
  final bool internationalClub;
  final String? stageInfo;
  final String? photoUrl;

  Joueur({
    this.id,
    required this.nom,
    required this.poste,
    required this.age,
    required this.categorie,
    this.taille,
    this.matchsJoues = 0,
    this.buts = 0,
    this.passesDecisives = 0,
    this.cartonsJaunes = 0,
    this.cartonsRouges = 0,
    this.internationalClub = false,
    this.stageInfo,
    this.photoUrl,
  });

  factory Joueur.fromJson(Map<String, dynamic> json) {
    return Joueur(
      id: json['id'],
      nom: json['nom'] ?? '',
      poste: json['poste'] ?? '',
      age: json['age'] ?? 0,
      categorie: json['categorie'] ?? '',
      taille: json['taille']?.toDouble(),
      matchsJoues: json['matchs_joues'] ?? 0,
      buts: json['buts'] ?? 0,
      passesDecisives: json['passes_decisives'] ?? 0,
      cartonsJaunes: json['cartons_jaunes'] ?? 0,
      cartonsRouges: json['cartons_rouges'] ?? 0,
      internationalClub: json['international_club'] ?? false,
      stageInfo: json['stage_info'],
      photoUrl: json['photo_url'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'nom': nom,
      'poste': poste,
      'age': age,
      'categorie': categorie,
      'taille': taille,
      'matchs_joues': matchsJoues,
      'buts': buts,
      'passes_decisives': passesDecisives,
      'cartons_jaunes': cartonsJaunes,
      'cartons_rouges': cartonsRouges,
      'international_club': internationalClub,
      'stage_info': stageInfo,
      'photo_url': photoUrl,
    };
  }
}
