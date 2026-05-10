import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/data_provider.dart';
import '../theme/app_theme.dart';

class GalerieScreen extends StatefulWidget {
  const GalerieScreen({super.key});

  @override
  State<GalerieScreen> createState() => _GalerieScreenState();
}

class _GalerieScreenState extends State<GalerieScreen> {
  String _selectedCat = "Matches";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Galerie")),
      body: Column(
        children: [
          _buildCategorySelector(),
          Expanded(
            child: Consumer<DataProvider>(
              builder: (context, data, child) {
                final filtered = data.galerie.where((g) => g.categorie == _selectedCat).toList();

                if (filtered.isEmpty) {
                  return const Center(child: Text("Aucune photo dans cette catégorie"));
                }

                return GridView.builder(
                  padding: const EdgeInsets.all(16),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 12,
                    mainAxisSpacing: 12,
                    childAspectRatio: 0.8,
                  ),
                  itemCount: filtered.length,
                  itemBuilder: (context, index) {
                    final item = filtered[index];
                    return GestureDetector(
                      onTap: () => _openFullScreen(context, item.imageUrl),
                      child: Card(
                        clipBehavior: Clip.antiAlias,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(child: Image.network(item.imageUrl, fit: BoxFit.cover, width: double.infinity)),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(item.titre, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                                  Text(item.description, style: const TextStyle(fontSize: 10, color: Colors.grey), maxLines: 1),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategorySelector() {
    final cats = ["Matches", "Entraînements", "Tournois", "Événements"];
    return Container(
      height: 60,
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: cats.length,
        itemBuilder: (context, index) {
          bool isSelected = _selectedCat == cats[index];
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: ChoiceChip(
              label: Text(cats[index]),
              selected: isSelected,
              onSelected: (val) {
                setState(() => _selectedCat = cats[index]);
                context.read<DataProvider>().fetchGalerie(categorie: cats[index]);
              },
            ),
          );
        },
      ),
    );
  }

  void _openFullScreen(BuildContext context, String url) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => Scaffold(
          backgroundColor: Colors.black,
          appBar: AppBar(backgroundColor: Colors.transparent, iconTheme: const IconThemeData(color: Colors.white)),
          body: Center(
            child: InteractiveViewer(
              child: Image.network(url),
            ),
          ),
        ),
      ),
    );
  }
}
