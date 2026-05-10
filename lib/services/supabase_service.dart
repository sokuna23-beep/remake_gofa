import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/joueur.dart';
import '../models/match.dart';
import '../models/classement.dart';
import '../models/galerie.dart';

class SupabaseService {
  final SupabaseClient _client = Supabase.instance.client;

  // Singleton pattern
  static final SupabaseService _instance = SupabaseService._internal();
  factory SupabaseService() => _instance;
  SupabaseService._internal();

  // --- JOUEURS ---
  Future<List<Joueur>> getJoueurs({String? categorie}) async {
    try {
      var query = _client.from('joueurs').select();
      if (categorie != null && categorie != 'TOUS') {
        query = query.eq('categorie', categorie);
      }
      final response = await query.order('nom');
      return (response as List).map((j) => Joueur.fromJson(j)).toList();
    } catch (e) {
      print('Erreur getJoueurs: $e');
      rethrow;
    }
  }

  Future<void> addJoueur(Joueur joueur) async {
    await _client.from('joueurs').insert(joueur.toJson());
  }

  // --- MATCHS ---
  Future<List<MatchFoot>> getMatchs() async {
    try {
      final response = await _client.from('matchs').select().order('date', ascending: false);
      return (response as List).map((m) => MatchFoot.fromJson(m)).toList();
    } catch (e) {
      print('Erreur getMatchs: $e');
      rethrow;
    }
  }

  // --- CLASSEMENT ---
  Future<List<ClassementEquipe>> getClassement(String competition) async {
    try {
      final response = await _client
          .from('classements')
          .select()
          .eq('competition', competition)
          .order('points', ascending: false);
      return (response as List).map((c) => ClassementEquipe.fromJson(c)).toList();
    } catch (e) {
      print('Erreur getClassement: $e');
      rethrow;
    }
  }

  // --- GALERIE ---
  Future<List<GalerieItem>> getGalerie(String? categorie) async {
    try {
      var query = _client.from('galerie').select();
      if (categorie != null) {
        query = query.eq('categorie', categorie);
      }
      final response = await query.order('date', ascending: false);
      return (response as List).map((g) => GalerieItem.fromJson(g)).toList();
    } catch (e) {
      print('Erreur getGalerie: $e');
      rethrow;
    }
  }
}
