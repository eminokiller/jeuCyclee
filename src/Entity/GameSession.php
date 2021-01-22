<?php

namespace App\Entity;

use App\Repository\GameSessionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=GameSessionRepository::class)
 */
class GameSession extends EntityRef
{


    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $duree;

    /**
     * @ORM\OneToMany(targetEntity=Equipe::class, mappedBy="gameSession")
     */
    private $equipes;

    public function __construct()
    {
        $this->equipes = new ArrayCollection();
    }



    public function getDuree(): ?int
    {
        return $this->duree;
    }

    public function setDuree(?int $duree): self
    {
        $this->duree = $duree;

        return $this;
    }

    /**
     * @return Collection|Equipe[]
     */
    public function getEquipes(): Collection
    {
        return $this->equipes;
    }

    public function addEquipe(Equipe $equipe): self
    {
        $this->equipes->add($equipe);
        $equipe->setGameSession($this);
//        if (!$this->equipes->contains($equipe)) {
//            $this->equipes[] = $equipe;
//            $equipe->setGameSession($this);
//        }

        return $this;
    }

    public function removeEquipe(Equipe $equipe): self
    {
        if ($this->equipes->removeElement($equipe)) {
            // set the owning side to null (unless already changed)
            if ($equipe->getGameSession() === $this) {
                $equipe->setGameSession(null);
            }
        }

        return $this;
    }
}
