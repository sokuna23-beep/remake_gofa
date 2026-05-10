import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/data_provider.dart';
import '../widgets/match_card.dart';
import '../theme/app_theme.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    Future.microtask(() => context.read<DataProvider>().fetchAllData());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Consumer<DataProvider>(
        builder: (context, data, child) {
          if (data.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          return CustomScrollView(
            slivers: [
              _buildHeader(),
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildQuickMenu(),
                      const SizedBox(height: 24),
                      _buildSectionHeader("RÉSULTAT RÉCENT", () {}),
                      if (data.matchs.isNotEmpty)
                        MatchCard(match: data.matchs.first)
                      else
                        const Center(child: Text("Aucun match récent")),
                      const SizedBox(height: 24),
                      _buildSectionHeader("ACTUALITÉS", () {}),
                      _buildNewsCard(),
                      const SizedBox(height: 80), // Padding bas
                    ],
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildHeader() {
    return SliverAppBar(
      expandedHeight: 250,
      pinned: true,
      flexibleSpace: FlexibleSpaceBar(
        background: Stack(
          fit: StackFit.expand,
          children: [
            Container(color: AppTheme.primaryColor),
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.sports_soccer, size: 80, color: AppTheme.secondaryColor),
                  const SizedBox(height: 10),
                  const Text(
                    "GOFA ACADEMY",
                    style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  const Text(
                    "Le talent se construit ici",
                    style: TextStyle(color: Colors.white70, fontSize: 16),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      actions: [
        IconButton(onPressed: () {}, icon: const Icon(Icons.notifications_none)),
      ],
    );
  }

  Widget _buildQuickMenu() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        _menuItem(Icons.article, "Actualités"),
        _menuItem(Icons.emoji_events, "Résultats"),
        _menuItem(Icons.event, "Matchs"),
        _menuItem(Icons.image, "Galerie"),
      ],
    );
  }

  Widget _menuItem(IconData icon, String label) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)],
          ),
          child: Icon(icon, color: AppTheme.primaryColor),
        ),
        const SizedBox(height: 8),
        Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500)),
      ],
    );
  }

  Widget _buildSectionHeader(String title, VoidCallback onTap) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(title, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.grey)),
        TextButton(onPressed: onTap, child: const Text("Voir tout")),
      ],
    );
  }

  Widget _buildNewsCard() {
    return Card(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 150,
            width: double.infinity,
            decoration: BoxDecoration(
              color: Colors.grey[300],
              borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
            ),
            child: const Icon(Icons.newspaper, size: 50, color: Colors.grey),
          ),
          const Padding(
            padding: EdgeInsets.all(12.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("Nouveau partenariat avec l'Olympique de Mbour", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                SizedBox(height: 8),
                Text("Une opportunité incroyable pour nos jeunes de la catégorie U17...", style: TextStyle(color: Colors.grey)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
