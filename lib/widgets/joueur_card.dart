import 'package:flutter/material.dart';
import '../models/joueur.dart';
import '../theme/app_theme.dart';
import '../screens/joueur_detail_screen.dart';

class JoueurCard extends StatelessWidget {
  final Joueur joueur;

  const JoueurCard({super.key, required this.joueur});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 3,
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      child: ListTile(
        contentPadding: const EdgeInsets.all(12),
        leading: CircleAvatar(
          radius: 30,
          backgroundColor: AppTheme.secondaryColor.withOpacity(0.2),
          backgroundImage: joueur.photoUrl != null ? NetworkImage(joueur.photoUrl!) : null,
          child: joueur.photoUrl == null 
              ? const Icon(Icons.person, size: 30, color: AppTheme.primaryColor)
              : null,
        ),
        title: Text(
          joueur.nom,
          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('${joueur.poste} | ${joueur.age} ans'),
            const SizedBox(height: 4),
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: AppTheme.primaryColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Text(
                    joueur.categorie,
                    style: const TextStyle(fontSize: 10, color: AppTheme.primaryColor, fontWeight: FontWeight.bold),
                  ),
                ),
                if (joueur.internationalClub) ...[
                  const SizedBox(width: 8),
                  const Icon(Icons.public, size: 14, color: Colors.blue),
                ],
                if (joueur.stageInfo != null) ...[
                  const SizedBox(width: 8),
                  const Icon(Icons.star, size: 14, color: Colors.amber),
                ],
              ],
            ),
          ],
        ),
        trailing: const Icon(Icons.arrow_forward_ios, size: 16),
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => JoueurDetailScreen(joueur: joueur),
            ),
          );
        },
      ),
    );
  }
}
