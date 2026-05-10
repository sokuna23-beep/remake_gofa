import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/data_provider.dart';
import '../widgets/joueur_card.dart';
import '../theme/app_theme.dart';

class JoueursScreen extends StatefulWidget {
  const JoueursScreen({super.key});

  @override
  State<JoueursScreen> createState() => _JoueursScreenState();
}

class _JoueursScreenState extends State<JoueursScreen> {
  String _searchQuery = "";
  String _selectedCat = "TOUS";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Les Espadons")),
      body: Column(
        children: [
          _buildSearchAndFilters(),
          Expanded(
            child: Consumer<DataProvider>(
              builder: (context, data, child) {
                final filtered = data.joueurs.where((j) {
                  final matchName = j.nom.toLowerCase().contains(_searchQuery.toLowerCase());
                  final matchCat = _selectedCat == "TOUS" || j.categorie == _selectedCat;
                  return matchName && matchCat;
                }).toList();

                if (filtered.isEmpty) {
                  return const Center(child: Text("Aucun joueur trouvé"));
                }

                return ListView.builder(
                  padding: const EdgeInsets.only(bottom: 20),
                  itemCount: filtered.length,
                  itemBuilder: (context, index) => JoueurCard(joueur: filtered[index]),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchAndFilters() {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          TextField(
            onChanged: (val) => setState(() => _searchQuery = val),
            decoration: InputDecoration(
              hintText: "Rechercher un joueur...",
              prefixIcon: const Icon(Icons.search),
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(30), borderSide: BorderSide.none),
            ),
          ),
          const SizedBox(height: 12),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: ["TOUS", "U15", "U16", "U17", "U19"].map((cat) {
                bool isSelected = _selectedCat == cat;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: FilterChip(
                    label: Text(cat),
                    selected: isSelected,
                    onSelected: (val) => setState(() => _selectedCat = cat),
                    selectedColor: AppTheme.secondaryColor,
                    labelStyle: TextStyle(color: isSelected ? AppTheme.primaryColor : Colors.black, fontWeight: FontWeight.bold),
                  ),
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }
}
