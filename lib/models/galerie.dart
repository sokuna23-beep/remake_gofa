class GalerieItem {
  final String id;
  final String titre;
  final String description;
  final String imageUrl;
  final String categorie; // Matches, Entraînements, Tournois, Événements
  final DateTime date;

  GalerieItem({
    required this.id,
    required this.titre,
    required this.description,
    required this.imageUrl,
    required this.categorie,
    required this.date,
  });

  factory GalerieItem.fromJson(Map<String, dynamic> json) {
    return GalerieItem(
      id: json['id'],
      titre: json['titre'] ?? '',
      description: json['description'] ?? '',
      imageUrl: json['image_url'] ?? '',
      categorie: json['categorie'] ?? 'Matches',
      date: DateTime.parse(json['date']),
    );
  }
}
