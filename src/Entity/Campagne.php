<?php

namespace App\Entity;

use App\Repository\CampagneRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

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
     * @Groups({"campagne"})
     * @ORM\OneToMany(targetEntity=ActionMarketing::class, mappedBy="campagne", cascade={"persist","remove"})
     */
    private $actionMarketings;

    /**
     * @Groups({"gamemodel"})
     * @ORM\Column(type="json_array", nullable=true)
     * @var array $weeksLevel1
     */
    private  $weeksLevel1;
    /**
     * @Groups({"gamemodel"})
     * @ORM\Column(type="json_array", nullable=true)
     * @var array $weeksLevel2
     */
    private  $weeksLevel2;

    /**
     * @Groups({"ref"})
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $cible;

    /**
     * @ORM\ManyToOne(targetEntity=GameSession::class, inversedBy="campagnes")
     */
    private $session;

    /**
     * @ORM\ManyToOne(targetEntity=Admin::class, inversedBy="campagnes")
     */
    private $owner;

    public function __construct()
    {

        $this->equipes = new ArrayCollection();
        $this->actionMarketings = new ArrayCollection();
        $this->weeksLevel1 = [];
        $this->weeksLevel2 = [];
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
    public function getWeeksLevel1(): ?array
    {
        return $this->weeksLevel1;
    }

    /**
     * @param array $weeksLevel1
     * @return Campagne
     */
    public function setWeeksLevel1(?array $weeksLevel1): Campagne
    {
        $this->weeksLevel1 = $weeksLevel1;
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

    /**
     * @return array
     */
    public function getWeeksLevel2(): ?array
    {
        return $this->weeksLevel2;
    }

    /**
     * @param array $weeksLevel2
     * @return Campagne
     */
    public function setWeeksLevel2(?array $weeksLevel2): Campagne
    {
        $this->weeksLevel2 = $weeksLevel2;
        return $this;
    }

    public function getCible(): ?string
    {
        return $this->cible;
    }

    public function setCible(?string $cible): self
    {
        $this->cible = $cible;

        return $this;
    }

    public function getSession(): ?GameSession
    {
        return $this->session;
    }

    public function setSession(?GameSession $session): self
    {
        $this->session = $session;

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
