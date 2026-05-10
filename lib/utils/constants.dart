import 'package:flutter/material.dart';

class AppConstants {
  static const String appName = "GOFA Academy";
  static const String slogan = "Le talent se construit ici";
  static const String mbourAddress = "Mbour, Sénégal";
  
  // Catégories
  static const List<String> categories = ["U15", "U16", "U17", "U19"];
  
  // Postes
  static const List<String> postes = [
    "Gardien de but", 
    "Défenseur", 
    "Milieu de terrain", 
    "Attaquant"
  ];

  // Supabase (À configurer)
  static const String supabaseUrl = "SUBSTITUTE_WITH_YOUR_URL";
  static const String supabaseAnonKey = "SUBSTITUTE_WITH_YOUR_KEY";
}
