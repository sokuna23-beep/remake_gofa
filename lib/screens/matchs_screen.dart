import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/data_provider.dart';
import '../widgets/match_card.dart';
import '../theme/app_theme.dart';

class MatchsScreen extends StatelessWidget {
  const MatchsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text("Matchs"),
          bottom: const TabBar(
            tabs: [
              Tab(text: "À venir"),
              Tab(text: "Passés"),
            ],
            indicatorColor: AppTheme.secondaryColor,
            labelColor: Colors.white,
          ),
        ),
        body: Consumer<DataProvider>(
          builder: (context, data, child) {
            final futureMatchs = data.matchs.where((m) => m.date.isAfter(DateTime.now())).toList();
            final pastMatchs = data.matchs.where((m) => m.date.isBefore(DateTime.now())).toList();

            return TabBarView(
              children: [
                _buildMatchList(futureMatchs, "Aucun match à venir"),
                _buildMatchList(pastMatchs, "Aucun match passé"),
              ],
            );
          },
        ),
      ),
    );
  }

  Widget _buildMatchList(List matches, String emptyMsg) {
    if (matches.isEmpty) {
      return Center(child: Text(emptyMsg));
    }
    return RefreshIndicator(
      onRefresh: () async {},
      child: ListView.builder(
        padding: const EdgeInsets.only(top: 8, bottom: 20),
        itemCount: matches.length,
        itemBuilder: (context, index) => MatchCard(match: matches[index]),
      ),
    );
  }
}
