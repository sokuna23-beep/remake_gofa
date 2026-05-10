import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class AcademieScreen extends StatelessWidget {
  const AcademieScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("L'Académie")),
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildHero(),
            _buildExpansionTile(
              "Notre Histoire", 
              Icons.history, 
              "Située au cœur de Mbour, la GOFA Academy a été fondée il y a 10 ans avec une mission claire : détecter les pépites sénégalaises et les former au plus haut niveau. Aujourd'hui, nous comptons plus de 200 pensionnaires répartis en 4 catégories.",
              isExpanded: true,
            ),
            _buildExpansionTile(
              "Staff Technique",
              Icons.groups,
              "Sous la direction de Cheikh Ahmed Tidjane Diene, notre staff est composé de 12 entraîneurs diplômés CAF, 2 préparateurs physiques et 1 psychologue sportif.",
            ),
            _buildExpansionTile(
              "Nos Installations",
              Icons.stadium,
              "- 2 terrains synthétiques aux normes FIFA\n- Centre d'hébergement moderne\n- Salle de sport et de rééducation\n- Cantine nutritionnelle spécialisée",
            ),
            _buildValeurs(),
            _buildChiffresCles(),
            const SizedBox(height: 50),
          ],
        ),
      ),
    );
  }

  Widget _buildHero() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: const BoxDecoration(color: AppTheme.primaryColor),
      child: const Column(
        children: [
          Icon(Icons.sports_soccer, size: 60, color: AppTheme.secondaryColor),
          SizedBox(height: 10),
          Text("GOFA", style: TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold)),
          Text("Le talent se construit ici", style: TextStyle(color: Colors.white70)),
        ],
      ),
    );
  }

  Widget _buildExpansionTile(String title, IconData icon, String content, {bool isExpanded = false}) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12)),
      child: ExpansionTile(
        initiallyExpanded: isExpanded,
        leading: Icon(icon, color: AppTheme.primaryColor),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(content, style: const TextStyle(height: 1.5)),
          ),
        ],
      ),
    );
  }

  Widget _buildValeurs() {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text("NOS VALEURS", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.grey)),
          const SizedBox(height: 12),
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 10,
            crossAxisSpacing: 10,
            childAspectRatio: 2.5,
            children: [
              _valeurCard("Discipline", Icons.verified),
              _valeurCard("Travail", Icons.fitness_center),
              _valeurCard("Excellence", Icons.stars),
              _valeurCard("Respect", Icons.favorite),
            ],
          ),
        ],
      ),
    );
  }

  Widget _valeurCard(String label, IconData icon) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.secondaryColor.withOpacity(0.1),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: AppTheme.secondaryColor.withOpacity(0.3)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: AppTheme.primaryColor, size: 18),
          const SizedBox(width: 8),
          Text(label, style: const TextStyle(fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }

  Widget _buildChiffresCles() {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppTheme.primaryColor,
        borderRadius: BorderRadius.circular(20),
      ),
      child: const Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _statItem("10", "Ans d'expertise"),
          _statItem("200+", "Joueurs"),
          _statItem("4", "Catégories"),
        ],
      ),
    );
  }

  static Widget _statItem(String val, String label) {
    return Column(
      children: [
        Text(val, style: const TextStyle(color: AppTheme.secondaryColor, fontSize: 24, fontWeight: FontWeight.bold)),
        Text(label, style: const TextStyle(color: Colors.white, fontSize: 10)),
      ],
    );
  }
}
