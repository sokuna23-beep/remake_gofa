import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:provider/provider.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'theme/app_theme.dart';
import 'providers/data_provider.dart';
import 'screens/home_screen.dart';
import 'screens/matchs_screen.dart';
import 'screens/classements_screen.dart';
import 'screens/joueurs_screen.dart';
import 'screens/academie_screen.dart';
import 'screens/contact_screen.dart';
import 'screens/galerie_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialisation de Supabase
  await Supabase.initialize(
    url: 'YOUR_SUPABASE_URL',
    anonKey: 'YOUR_SUPABASE_ANON_KEY',
  );

  // Initialisation du formatage de date en français
  await initializeDateFormatting('fr_FR', null);

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => DataProvider()),
      ],
      child: const GOFAApp(),
    ),
  );
}

class GOFAApp extends StatelessWidget {
  const GOFAApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GOFA Academy',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const MainNavigation(),
    );
  }
}

class MainNavigation extends StatefulWidget {
  const MainNavigation({super.key});

  @override
  State<MainNavigation> createState() => _MainNavigationState();
}

class _MainNavigationState extends State<MainNavigation> {
  int _selectedIndex = 0;

  final List<Widget> _screens = [
    const HomeScreen(),
    const MatchsScreen(),
    const ClassementsScreen(),
    const JoueursScreen(),
    const AcademieScreen(),
    const GalerieScreen(),
    const ContactScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Accueil'),
          BottomNavigationBarItem(icon: Icon(Icons.sports_soccer), label: 'Matchs'),
          BottomNavigationBarItem(icon: Icon(Icons.leaderboard), label: 'Classement'),
          BottomNavigationBarItem(icon: Icon(Icons.people), label: 'Joueurs'),
          BottomNavigationBarItem(icon: Icon(Icons.school), label: 'Académie'),
          BottomNavigationBarItem(icon: Icon(Icons.photo_library), label: 'Galerie'),
          BottomNavigationBarItem(icon: Icon(Icons.contact_support), label: 'Contact'),
        ],
      ),
    );
  }
}
