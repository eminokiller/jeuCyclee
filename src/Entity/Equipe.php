<?php

namespace App\Entity;

use App\Repository\EquipeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=EquipeRepository::class)
 */
class Equipe extends EntityRef
{
    /**
     * @ORM\OneToMany(targetEntity=Joueur::class, mappedBy="equipe")
     */
    private $joueurs;

    /**
     * @ORM\ManyToOne(targetEntity=GameSession::class, inversedBy="equipes")
     */
    private $gameSession;

    /**
     * @ORM\ManyToOne(targetEntity=Admin::class, inversedBy="equipes")
     */
    private $owner;

    public function __construct()
    {
        $this->joueurs = new ArrayCollection();
    }

    /**
     * @return Collection|Joueur[]
     */
    public function getJoueurs(): Collection
    {
        return $this->joueurs;
    }

    public function addJoueur(Joueur $joueur): self
    {
        $this->joueurs->add($joueur);
        $joueur->setEquipe($this);
//        if (!$this->joueurs->contains($joueur)) {
//            $this->joueurs[] = $joueur;
//            $joueur->setEquipe($this);
//        }

        return $this;
    }

    public function removeJoueur(Joueur $joueur): self
    {
        if ($this->joueurs->removeElement($joueur)) {
            // set the owning side to null (unless already changed)
            if ($joueur->getEquipe() === $this) {
                $joueur->setEquipe(null);
            }
        }

        return $this;
    }

    public function getGameSession(): ?GameSession
    {
        return $this->gameSession;
    }

    public function setGameSession(?GameSession $gameSession): self
    {
        $this->gameSession = $gameSession;

        return $this;
    }

    public function getOwner(): ?Admin
    {
        return $this->owner;
    }

    public function setOwner(?Admin $owner): self
    {
        $this->owner = $owner;

        return $this;
    }
}
