import 'package:flutter/material.dart';

class AppTheme {
  // Couleurs principales de la maquette
  static const Color primaryColor = Color(0xFF1A5F7A); // Bleu GOFA
  static const Color secondaryColor = Color(0xFFF9D56E); // Jaune Academy
  static const Color accentColor = Color(0xFF2C3333);
  static const Color backgroundColor = Color(0xFFF5F5F5);
  
  static const Color matchCardGreen = Color(0xFF4CAF50);
  static const Color matchCardBlue = Color(0xFF2196F3);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      primaryColor: primaryColor,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryColor,
        primary: primaryColor,
        secondary: secondaryColor,
      ),
      scaffoldBackgroundColor: backgroundColor,
      appBarTheme: const AppBarTheme(
        backgroundColor: primaryColor,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        selectedItemColor: primaryColor,
        unselectedItemColor: Colors.grey,
        showUnselectedLabels: true,
        type: BottomNavigationBarType.fixed,
      ),
      cardTheme: CardTheme(
        elevation: 2,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      ),
      textTheme: const TextTheme(
        titleLarge: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: primaryColor,
        ),
        titleMedium: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.w600,
        ),
        bodyLarge: TextStyle(
          fontSize: 16,
          color: Colors.black87,
        ),
        bodyMedium: TextStyle(
          fontSize: 14,
          color: Colors.black54,
        ),
      ),
    );
  }
}
