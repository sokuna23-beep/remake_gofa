import 'package:intl/intl.dart';

class MatchFoot {
  final String? id;
  final String equipeDomicile;
  final String equipeExterieur;
  final int? scoreDomicile;
  final int? scoreExterieur;
  final DateTime date;
  final String stade;
  final String competition;
  final String categorie;
  final String? logoDomicile;
  final String? logoExterieur;

  MatchFoot({
    this.id,
    required this.equipeDomicile,
    required this.equipeExterieur,
    this.scoreDomicile,
    this.scoreExterieur,
    required this.date,
    required this.stade,
    required this.competition,
    required this.categorie,
    this.logoDomicile,
    this.logoExterieur,
  });

  String getScoreText() {
    if (scoreDomicile == null || scoreExterieur == null) {
      return "VS";
    }
    return "$scoreDomicile - $scoreExterieur";
  }

  String getFormattedDate() {
    return DateFormat('dd MMMM yyyy - HH:mm', 'fr_FR').format(date);
  }

  factory MatchFoot.fromJson(Map<String, dynamic> json) {
    return MatchFoot(
      id: json['id'],
      equipeDomicile: json['equipe_domicile'] ?? '',
      equipeExterieur: json['equipe_exterieur'] ?? '',
      scoreDomicile: json['score_domicile'],
      scoreExterieur: json['score_exterieur'],
      date: DateTime.parse(json['date']),
      stade: json['stade'] ?? '',
      competition: json['competition'] ?? '',
      categorie: json['categorie'] ?? '',
      logoDomicile: json['logo_domicile'],
      logoExterieur: json['logo_exterieur'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'equipe_domicile': equipeDomicile,
      'equipe_exterieur': equipeExterieur,
      'score_domicile': scoreDomicile,
      'score_exterieur': scoreExterieur,
      'date': date.toIso8601String(),
      'stade': stade,
      'competition': competition,
      'categorie': categorie,
      'logo_domicile': logoDomicile,
      'logo_exterieur': logoExterieur,
    };
  }
}
