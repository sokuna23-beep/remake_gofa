import 'package:flutter/material.dart';
import '../models/joueur.dart';
import '../models/match.dart';
import '../models/classement.dart';
import '../models/galerie.dart';
import '../services/supabase_service.dart';

class DataProvider extends ChangeNotifier {
  final SupabaseService _service = SupabaseService();

  List<Joueur> _joueurs = [];
  List<MatchFoot> _matchs = [];
  List<ClassementEquipe> _classement = [];
  List<GalerieItem> _galerie = [];
  bool _isLoading = false;

  List<Joueur> get joueurs => _joueurs;
  List<MatchFoot> get matchs => _matchs;
  List<ClassementEquipe> get classement => _classement;
  List<GalerieItem> get galerie => _galerie;
  bool get isLoading => _isLoading;

  Future<void> fetchAllData() async {
    _isLoading = true;
    notifyListeners();
    try {
      await Future.wait([
        fetchJoueurs(),
        fetchMatchs(),
        fetchClassement('Ligue des Prodiges'),
        fetchGalerie(),
      ]);
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> fetchJoueurs({String? categorie}) async {
    _joueurs = await _service.getJoueurs(categorie: categorie);
    notifyListeners();
  }

  Future<void> fetchMatchs() async {
    _matchs = await _service.getMatchs();
    notifyListeners();
  }

  Future<void> fetchClassement(String competition) async {
    _classement = await _service.getClassement(competition);
    notifyListeners();
  }

  Future<void> fetchGalerie({String? categorie}) async {
    _galerie = await _service.getGalerie(categorie);
    notifyListeners();
  }
}
