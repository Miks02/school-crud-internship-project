using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WEB_Api___angular_praksa.Models;

public partial class Skola2025Context : DbContext
{
    public Skola2025Context()
    {
    }

    public Skola2025Context(DbContextOptions<Skola2025Context> options)
        : base(options)
    {
    }

    public virtual DbSet<Odeljenja> Odeljenja { get; set; }

    public virtual DbSet<Razredi> Razredi { get; set; }

    public virtual DbSet<Sifarnici> Sifarnici { get; set; }

    public virtual DbSet<StavkeSifarnika> StavkeSifarnika { get; set; }

    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Odeljenja>(entity =>
        {
            entity.HasKey(e => e.OdeljenjeId).HasName("PK__Odeljenj__CF9FB200160AAB4A");

            entity.ToTable("Odeljenja");

            entity.Property(e => e.OdeljenjeId).HasColumnName("OdeljenjeID");
            entity.Property(e => e.JezikNastaveId).HasColumnName("JezikNastaveID");
            entity.Property(e => e.NazivIzdvojeneSkole).HasMaxLength(30);
            entity.Property(e => e.NazivOdeljenja)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.OdeljenskiStaresina).HasMaxLength(30);
            entity.Property(e => e.ProgramId).HasColumnName("ProgramID");
            entity.Property(e => e.PrviStraniJezikId).HasColumnName("PrviStraniJezikID");
            entity.Property(e => e.RazredId).HasColumnName("RazredID");
            entity.Property(e => e.SkolskaGodinaId).HasColumnName("SkolskaGodinaID");
            entity.Property(e => e.VrstaOdeljenjaId).HasColumnName("VrstaOdeljenjaID");

            entity.HasOne(d => d.JezikNastave).WithMany(p => p.OdeljenjaJezikNastave)
                .HasForeignKey(d => d.JezikNastaveId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Odeljenja__Jezik__4316F928");

            entity.HasOne(d => d.Program).WithMany(p => p.OdeljenjaProgram)
                .HasForeignKey(d => d.ProgramId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Odeljenja__Progr__44FF419A");

            entity.HasOne(d => d.PrviStraniJezik).WithMany(p => p.OdeljenjaPrviStraniJezik)
                .HasForeignKey(d => d.PrviStraniJezikId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Odeljenja__PrviS__440B1D61");

            entity.HasOne(d => d.Razred).WithMany(p => p.Odeljenja)
                .HasForeignKey(d => d.RazredId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Odeljenja__Razre__403A8C7D");

            entity.HasOne(d => d.SkolskaGodina).WithMany(p => p.OdeljenjaSkolskaGodina)
                .HasForeignKey(d => d.SkolskaGodinaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Odeljenja__Skols__412EB0B6");

            entity.HasOne(d => d.VrstaOdeljenja).WithMany(p => p.OdeljenjaVrstaOdeljenja)
                .HasForeignKey(d => d.VrstaOdeljenjaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Odeljenja__Vrsta__4222D4EF");
        });

        modelBuilder.Entity<Razredi>(entity =>
        {
            entity.HasKey(e => e.RazredId).HasName("PK__Razredi__FD2C6CC6735EADEB");

            entity.ToTable("Razredi");

            entity.Property(e => e.RazredId).HasColumnName("RazredID");
            entity.Property(e => e.NazivRazreda)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.ProgramId).HasColumnName("ProgramID");
            entity.Property(e => e.SkolskaGodinaId).HasColumnName("SkolskaGodinaID");

            entity.HasOne(d => d.Program).WithMany(p => p.RazrediProgram)
                .HasForeignKey(d => d.ProgramId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Razredi__Program__3D5E1FD2");

            entity.HasOne(d => d.SkolskaGodina).WithMany(p => p.RazrediSkolskaGodina)
                .HasForeignKey(d => d.SkolskaGodinaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Razredi__Skolska__3C69FB99");
        });

        modelBuilder.Entity<Sifarnici>(entity =>
        {
            entity.HasKey(e => e.SifarnikId).HasName("PK__Sifarnic__F1783B755DF5DE7E");

            entity.ToTable("Sifarnici");

            entity.Property(e => e.SifarnikId).HasColumnName("SifarnikID");
            entity.Property(e => e.Naziv)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<StavkeSifarnika>(entity =>
        {
            entity.HasKey(e => e.StavkaId).HasName("PK__StavkeSi__ACCAA8F37E885652");

            entity.ToTable("StavkeSifarnika");

            entity.Property(e => e.StavkaId).HasColumnName("StavkaID");
            entity.Property(e => e.SifarnikId).HasColumnName("SifarnikID");
            entity.Property(e => e.Vrednost)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.Sifarnik).WithMany(p => p.StavkeSifarnika)
                .HasForeignKey(d => d.SifarnikId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__StavkeSif__Sifar__398D8EEE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
