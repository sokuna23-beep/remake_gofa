import 'package:flutter/material.dart';
import '../models/match.dart';
import '../theme/app_theme.dart';

class MatchCard extends StatelessWidget {
  final MatchFoot match;

  const MatchCard({super.key, required this.match});

  @override
  Widget build(BuildContext context) {
    bool isPast = match.date.isBefore(DateTime.now());

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  match.getFormattedDate(),
                  style: const TextStyle(fontSize: 12, color: Colors.grey),
                ),
                Text(
                  match.stade,
                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
                ),
              ],
            ),
            const Divider(),
            const SizedBox(height: 10),
            Row(
              children: [
                Expanded(
                  child: Column(
                    children: [
                      const Icon(Icons.shield, size: 40, color: AppTheme.primaryColor),
                      const SizedBox(height: 5),
                      Text(match.equipeDomicile, textAlign: TextAlign.center, style: const TextStyle(fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: isPast ? Colors.grey[200] : AppTheme.secondaryColor.withOpacity(0.3),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    match.getScoreText(),
                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                ),
                Expanded(
                  child: Column(
                    children: [
                      const Icon(Icons.shield_outlined, size: 40, color: Colors.grey),
                      const SizedBox(height: 5),
                      Text(match.equipeExterieur, textAlign: TextAlign.center, style: const TextStyle(fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 15),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: AppTheme.primaryColor,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    match.competition,
                    style: const TextStyle(color: Colors.white, fontSize: 10),
                  ),
                ),
                const SizedBox(width: 10),
                Text(match.categorie, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
