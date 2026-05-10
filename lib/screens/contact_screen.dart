import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../theme/app_theme.dart';

class ContactScreen extends StatelessWidget {
  const ContactScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Contactez-nous")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            _buildPresidentCard(),
            const SizedBox(height: 24),
            _buildContactInfo(
              icon: Icons.phone,
              title: "Téléphone",
              val: "+221 78 129 27 91",
              onTap: () => _launchCaller("+221781292791"),
            ),
            _buildContactInfo(
              icon: Icons.email,
              title: "Email",
              val: "cheikhdiene125@gmail.com",
              onTap: () => _launchEmail("cheikhdiene125@gmail.com"),
            ),
            _buildContactInfo(
              icon: Icons.location_on,
              title: "Adresse",
              val: "Quartier Médine, Mbour, Sénégal",
              onTap: () => _launchMaps(),
            ),
            const SizedBox(height: 30),
            _buildForm(context),
            const SizedBox(height: 50),
          ],
        ),
      ),
    );
  }

  Widget _buildPresidentCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppTheme.primaryColor,
        borderRadius: BorderRadius.circular(15),
      ),
      child: const Row(
        children: [
          CircleAvatar(radius: 30, backgroundColor: AppTheme.secondaryColor, child: Icon(Icons.person, color: AppTheme.primaryColor)),
          SizedBox(width: 16),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("Cheikh Ahmed Tidjane Diene", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
              Text("Président / Directeur Technique", style: TextStyle(color: AppTheme.secondaryColor)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildContactInfo({required IconData icon, required String title, required String val, required VoidCallback onTap}) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: Icon(icon, color: AppTheme.primaryColor),
        title: Text(title, style: const TextStyle(fontSize: 12, color: Colors.grey)),
        subtitle: Text(val, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        trailing: const Icon(Icons.chevron_right),
        onTap: onTap,
      ),
    );
  }

  Widget _buildForm(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text("ENVOYER UN MESSAGE RAPIDE", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.grey)),
        const SizedBox(height: 16),
        TextField(decoration: InputDecoration(labelText: "Nom complet", border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)))),
        const SizedBox(height: 12),
        TextField(decoration: InputDecoration(labelText: "Email", border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)))),
        const SizedBox(height: 12),
        TextField(maxLines: 4, decoration: InputDecoration(labelText: "Votre message", border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)))),
        const SizedBox(height: 20),
        SizedBox(
          width: double.infinity,
          height: 50,
          child: ElevatedButton(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Message envoyé avec succès !")));
            },
            style: ElevatedButton.styleFrom(backgroundColor: AppTheme.primaryColor, foregroundColor: Colors.white),
            child: const Text("ENVOYER"),
          ),
        ),
      ],
    );
  }

  void _launchCaller(String p) async {
    final url = Uri.parse("tel:$p");
    if (await canLaunchUrl(url)) await launchUrl(url);
  }

  void _launchEmail(String e) async {
    final url = Uri.parse("mailto:$e?subject=Contact GOFA Academy");
    if (await canLaunchUrl(url)) await launchUrl(url);
  }

  void _launchMaps() async {
    final url = Uri.parse("https://www.google.com/maps/search/Mbour+Senegal");
    if (await canLaunchUrl(url)) await launchUrl(url);
  }
}
