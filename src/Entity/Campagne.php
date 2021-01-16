<?php

namespace App\Entity;

use App\Repository\CampagneRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CampagneRepository::class)
 */
class Campagne extends EntityRef
{

    /**
     * @ORM\ManyToMany(targetEntity=Equipe::class)
     */
    private $equipes;

    /**
     * @ORM\ManyToMany(targetEntity=ActionMarketing::class)
     */
    private $actionMarketings;

    /**
     * @ORM\Column(type="json_array", nullable=true)
     * @var array $weeks
     */
    private  $weeks;

    public function __construct()
    {

        $this->equipes = new ArrayCollection();
        $this->actionMarketings = new ArrayCollection();
        $this->weeks = [];
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
        if (!$this->equipes->contains($equipe)) {
            $this->equipes[] = $equipe;
            $equipe->setCampagne($this);
        }

        return $this;
    }

    public function removeEquipe(Equipe $equipe): self
    {
        if ($this->equipes->removeElement($equipe)) {
            // set the owning side to null (unless already changed)
            if ($equipe->getCampagne() === $this) {
                $equipe->setCampagne(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|ActionMarketing[]
     */
    public function getActionMarketings(): Collection
    {
        return $this->actionMarketings;
    }

    public function addActionMarketing(ActionMarketing $actionMarketing): self
    {
        if (!$this->actionMarketings->contains($actionMarketing)) {
            $this->actionMarketings[] = $actionMarketing;
            $actionMarketing->setCampagne($this);
        }

        return $this;
    }

    public function removeActionMarketing(ActionMarketing $actionMarketing): self
    {
        if ($this->actionMarketings->removeElement($actionMarketing)) {
            // set the owning side to null (unless already changed)
            if ($actionMarketing->getCampagne() === $this) {
                $actionMarketing->setCampagne(null);
            }
        }

        return $this;
    }

    /**
     * @return array
     */
    public function getWeeks(): array
    {
        return $this->weeks;
    }

    /**
     * @param array $weeks
     * @return Campagne
     */
    public function setWeeks(array $weeks): Campagne
    {
        $this->weeks = $weeks;
        return $this;
    }

    /**
     * @param mixed $actionMarketings
     */
    public function setActionMarketings($actionMarketings): void
    {
        $this->actionMarketings = $actionMarketings;
    }

    /**
     * @param mixed $equipes
     */
    public function setEquipes($equipes): void
    {
        $this->equipes = $equipes;
    }



}
