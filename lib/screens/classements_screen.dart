import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/data_provider.dart';
import '../theme/app_theme.dart';

class ClassementsScreen extends StatelessWidget {
  const ClassementsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Classements")),
      body: Consumer<DataProvider>(
        builder: (context, data, child) {
          if (data.classement.isEmpty) {
            return const Center(child: Text("Données de classement indisponibles"));
          }

          return Column(
            children: [
              _buildLeagueSelector(),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 5)],
                  ),
                  child: DataTable(
                    columnSpacing: 20,
                    horizontalMargin: 15,
                    headingRowColor: MaterialStateProperty.all(AppTheme.primaryColor.withOpacity(0.05)),
                    columns: const [
                      DataColumn(label: Text('#', style: TextStyle(fontWeight: FontWeight.bold))),
                      DataColumn(label: Text('Club', style: TextStyle(fontWeight: FontWeight.bold))),
                      DataColumn(label: Text('MJ', style: TextStyle(fontWeight: FontWeight.bold))),
                      DataColumn(label: Text('Pts', style: TextStyle(fontWeight: FontWeight.bold))),
                    ],
                    rows: data.classement.map((c) {
                      bool isGofa = c.nom.contains("GOFA");
                      return DataRow(
                        color: isGofa ? MaterialStateProperty.all(AppTheme.primaryColor.withOpacity(0.1)) : null,
                        cells: [
                          DataCell(
                            c.position == 1 
                              ? const Icon(Icons.emoji_events, color: Colors.amber, size: 20)
                              : Text(c.position.toString())
                          ),
                          DataCell(
                            Row(
                              children: [
                                const Icon(Icons.shield, size: 16, color: Colors.grey),
                                const SizedBox(width: 8),
                                Text(c.nom, style: TextStyle(fontWeight: isGofa ? FontWeight.bold : FontWeight.normal)),
                              ],
                            )
                          ),
                          DataCell(Text(c.matchsJoues.toString())),
                          DataCell(Text(c.points.toString(), style: const TextStyle(fontWeight: FontWeight.bold))),
                        ],
                      );
                    }).toList(),
                  ),
                ),
              ),
              const Spacer(),
              _buildLegend(),
            ],
          );
        },
      ),
    );
  }

  Widget _buildLeagueSelector() {
    return Container(
      height: 50,
      margin: const EdgeInsets.symmetric(vertical: 16),
      child: ListView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        children: [
          _leagueChip("Prodiges", true),
          _leagueChip("Légendes", false),
          _leagueChip("Chade League", false),
        ],
      ),
    );
  }

  Widget _leagueChip(String label, bool isSelected) {
    return Container(
      margin: const EdgeInsets.only(right: 8),
      child: ChoiceChip(
        label: Text(label),
        selected: isSelected,
        onSelected: (val) {},
        selectedColor: AppTheme.secondaryColor,
        labelStyle: TextStyle(color: isSelected ? AppTheme.primaryColor : Colors.black, fontWeight: FontWeight.bold),
      ),
    );
  }

  Widget _buildLegend() {
    return const Padding(
      padding: EdgeInsets.all(20.0),
      child: Row(
        children: [
          Icon(Icons.info_outline, size: 16, color: Colors.grey),
          SizedBox(width: 8),
          Text("MJ = Matchs Joués | Pts = Points", style: TextStyle(fontSize: 12, color: Colors.grey)),
        ],
      ),
    );
  }
}
