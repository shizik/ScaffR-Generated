﻿using System;
using System.Collections.Generic;
using System.Text;
using DemoApplication.Areas.Api.Models;

namespace DemoApplication.Areas.Api.Metadata
{
    public class MetadataRegistry
    {
        private static readonly List<Type> Data = new List<Type>
        {
            typeof(EmployeeBrief),
            typeof(TeamBrief),
            typeof(TemplateBrief),
            
            typeof(Employee),
            typeof(Assignment),
        };

        public static MetadataDefinition Generate()
        {
            var metadata = new MetadataDefinition
            {
                MetadataVersion = "1.0.4",
                StructuralTypes = new List<StructuralType>(Data.Count)
            };

            foreach (var type in Data)
            {
                var structType = new StructuralType
                {
                    ShortName = type.Name,
                    Namespace = "Models",
                    AutoGeneratedKeyType = "None",
                    DataProperties = new List<DataProperty>()
                };

                foreach (var prop in type.GetProperties())
                {
                    structType.DataProperties.Add(new DataProperty
                    {
                        Name = ToCamelCase(prop.Name),
                        DataType = prop.PropertyType.Name,
                        IsNullable = !prop.PropertyType.IsValueType || (Nullable.GetUnderlyingType(prop.PropertyType) != null),
                        IsPartOfKey = prop.Name == "Id" ? true : false
                    });
                }

                metadata.StructuralTypes.Add(structType);
            }

            return metadata;
        }

        //
        // Helpers

        private static string ToCamelCase(string s)
        {
            if (string.IsNullOrEmpty(s))
                return s;

            if (!char.IsUpper(s[0]))
                return s;

            var sb = new StringBuilder();
            for (int i = 0; i < s.Length; i++)
            {
                bool hasNext = (i + 1 < s.Length);
                if ((i == 0 || !hasNext) || char.IsUpper(s[i + 1]))
                {
                    char lowerCase;

                    lowerCase = char.ToLower(s[i]);
                    sb.Append(lowerCase);
                }
                else
                {
                    sb.Append(s.Substring(i));
                    break;
                }
            }

            return sb.ToString();
        }
    }
}