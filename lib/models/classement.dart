class ClassementEquipe {
  final int position;
  final String nom;
  final int matchsJoues;
  final int points;
  final int differenceDeButs;
  final String? logoUrl;

  ClassementEquipe({
    required this.position,
    required this.nom,
    required this.matchsJoues,
    required this.points,
    required this.differenceDeButs,
    this.logoUrl,
  });

  factory ClassementEquipe.fromJson(Map<String, dynamic> json) {
    return ClassementEquipe(
      position: json['position'] ?? 0,
      nom: json['nom'] ?? '',
      matchsJoues: json['matchs_joues'] ?? 0,
      points: json['points'] ?? 0,
      differenceDeButs: json['diff_buts'] ?? 0,
      logoUrl: json['logo_url'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'position': position,
      'nom': nom,
      'matchs_joues': matchsJoues,
      'points': points,
      'diff_buts': differenceDeButs,
      'logo_url': logoUrl,
    };
  }
}
