import 'package:flutter/material.dart';
import '../models/joueur.dart';
import '../theme/app_theme.dart';

class JoueurDetailScreen extends StatelessWidget {
  final Joueur joueur;

  const JoueurDetailScreen({super.key, required this.joueur});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.primaryColor,
      appBar: AppBar(
        title: const Text("Profil Joueur"),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildProfileHead(),
            Container(
              width: double.infinity,
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.vertical(top: Radius.circular(30)),
              ),
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildSectionTitle("STATISTIQUES"),
                  _statsGrid(),
                  const SizedBox(height: 30),
                  _buildSectionTitle("PARCOURS DU JOUEUR"),
                  _parcoursInfo(),
                  const SizedBox(height: 50),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileHead() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 20),
      child: Column(
        children: [
          CircleAvatar(
            radius: 60,
            backgroundColor: AppTheme.secondaryColor,
            child: joueur.photoUrl != null 
              ? ClipOval(child: Image.network(joueur.photoUrl!, width: 110, height: 110, fit: BoxFit.cover))
              : const Icon(Icons.person, size: 80, color: AppTheme.primaryColor),
          ),
          const SizedBox(height: 16),
          Text(joueur.nom, style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
          Text(joueur.poste, style: const TextStyle(color: AppTheme.secondaryColor, fontSize: 18)),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _infoChip("Âge", "${joueur.age} ans"),
              _infoChip("Catégorie", joueur.categorie),
              _infoChip("Taille", joueur.taille != null ? "${joueur.taille} m" : "--"),
            ],
          ),
        ],
      ),
    );
  }

  Widget _infoChip(String label, String val) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 8),
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Text(label, style: const TextStyle(color: Colors.white70, fontSize: 10)),
          Text(val, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.grey)),
    );
  }

  Widget _statsGrid() {
    return Table(
      children: [
        _statRow("Matchs joués", joueur.matchsJoues.toString()),
        _statRow("Buts", joueur.buts.toString()),
        _statRow("Passes décisives", joueur.passesDecisives.toString()),
        _statRow("Cartons jaunes", joueur.cartonsJaunes.toString()),
        _statRow("Cartons rouges", joueur.cartonsRouges.toString()),
      ],
    );
  }

  TableRow _statRow(String label, String val) {
    return TableRow(
      children: [
        Padding(padding: const EdgeInsets.symmetric(vertical: 8), child: Text(label)),
        Padding(padding: const EdgeInsets.symmetric(vertical: 8), child: Text(val, style: const TextStyle(fontWeight: FontWeight.bold), textAlign: TextAlign.right)),
      ],
    );
  }

  Widget _parcoursInfo() {
    return Column(
      children: [
        ListTile(
          leading: const Icon(Icons.star, color: Colors.amber),
          title: const Text("Infos de Stage"),
          subtitle: Text(joueur.stageInfo ?? "Aucun stage récent"),
        ),
        ListTile(
          leading: const Icon(Icons.public, color: Colors.blue),
          title: const Text("Club International"),
          subtitle: Text(joueur.internationalClub ? "Oui" : "Non"),
        ),
      ],
    );
  }
}
