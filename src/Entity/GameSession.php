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
     * @ORM\OneToMany(targetEntity=Campagne::class, mappedBy="session")
     */
    private $campagnes;

    public function __construct()
    {

        $this->campagnes = new ArrayCollection();
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
     * @return Collection|Campagne[]
     */
    public function getCampagnes(): Collection
    {
        return $this->campagnes;
    }

    public function addCampagne(Campagne $campagne): self
    {
        $this->campagnes->add($campagne);
        $campagne->setSession($this);
//        if (!$this->campagnes->contains($campagne)) {
//            $this->campagnes[] = $campagne;
//            $campagne->setSession($this);
//        }

        return $this;
    }

    public function removeCampagne(Campagne $campagne): self
    {
        if ($this->campagnes->removeElement($campagne)) {
            // set the owning side to null (unless already changed)
            if ($campagne->getSession() === $this) {
                $campagne->setSession(null);
            }
        }

        return $this;
    }
}
